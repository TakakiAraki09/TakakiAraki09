package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/nstratos/go-myanimelist/mal"
)

type demoClient struct {
	*mal.Client
	err error
}

func sleep() {
	time.Sleep(5 * time.Second)
}

func (c *demoClient) showcase(ctx context.Context) error {
	methods := []func(context.Context){
		// c.seasonalAnime,
		c.userAnimeList,
	}

	for _, m := range methods {
		m(ctx)
	}
	if c.err != nil {
		return c.err
	}
	return nil
}

func (c *demoClient) getAnimeDetails(ctx context.Context, animeID int) (*mal.Anime, error) {
	cacheName := fmt.Sprintf("anime_list/cache_%d.json", animeID)
	cache, err := os.ReadFile(cacheName)

	if err == nil {
		anime := new(mal.Anime)
		// completed only cache
		if err := json.Unmarshal(cache, anime); err == nil && (anime.MyListStatus.Status == "completed" || anime.MyListStatus.Status == "dropped") {
			fmt.Printf("Using cached data for anime %d\n", animeID)
			return anime, nil
		}

		if anime.MyListStatus.Status != "completed" && anime.MyListStatus.Status != "dropped" {
			fmt.Printf("Cache incomplete for anime %s status %s, fetching from API\n", anime.AlternativeTitles.Ja, anime.MyListStatus.Status)
		}
	}

	fmt.Printf("Fetching anime details for %d from API\n", animeID)
	animeDetail, _, err := c.Anime.Details(ctx, animeID, mal.Fields{
		"id",
		"title",
		"main_picture",
		"alternative_titles",
		"start_date",
		"end_date",
		"synopsis",
		"mean",
		"rank",
		"popularity",
		"num_list_users",
		"num_scoring_users",
		"nsfw",
		"created_at",
		"updated_at",
		"media_type",
		"status",
		"genres",
		"my_list_status",
		"num_episodes",
		"start_season",
		"broadcast",
		"source",
		"average_episode_duration",
		"rating",
		"pictures",
		"background",
		"studios",
	},
	)
	if err != nil {
		return nil, fmt.Errorf("fetching anime details: %v", err)
	}

	sleep()
	jsonData, err := json.MarshalIndent(animeDetail, "", "   ")
	if err != nil {
		return nil, fmt.Errorf("marshaling anime details: %v", err)
	}

	if err := os.WriteFile(cacheName, jsonData, 0644); err != nil {
		return nil, fmt.Errorf("writing cache file: %v", err)
	}

	fmt.Println(animeDetail.MyListStatus.Status)

	return animeDetail, nil
}

func (c *demoClient) userAnimeList(ctx context.Context) {
	user := "araki0809"
	animeList, _, err := c.User.AnimeList(
		ctx,
		user,
		mal.Limit(100),
		mal.Offset(0),
	)

	animeList2, _, err := c.User.AnimeList(
		ctx,
		user,
		mal.Limit(100),
		mal.Offset(100),
	)
	animeList = append(animeList, animeList2...)

	if err != nil {
		c.err = err
		return
	}

	userAnimeList := []*mal.Anime{}
	for _, anime := range animeList {
		a, err := c.getAnimeDetails(ctx, anime.Anime.ID)
		if err != nil {
			c.err = err
			return
		}
		userAnimeList = append(userAnimeList, a)
	}
	m, err := json.Marshal(userAnimeList)
	if err != nil {
		c.err = err
		return
	}

	if err := os.WriteFile("result.json", []byte(m), 0644); err != nil {
		c.err = err
		return
	}
	fmt.Println("completed my anime list")
}
