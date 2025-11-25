package main

import (
	"context"
	"fmt"

	"github.com/nstratos/go-myanimelist/mal"
)

// demoClient has methods showcasing the usage of the different MyAnimeList API
// methods. It stores the first error it encounters so error checking only needs
// to be done once.
//
// This pattern is used for convenience and should not be used in concurrent
// code without guarding the error.
type demoClient struct {
	*mal.Client
	err error
}

func (c *demoClient) showcase(ctx context.Context) error {
	methods := []func(context.Context){
		// Uncomment the methods you need to see their results. Run or build
		// using -tags=debug to see the full HTTP request and response.
		c.userMyInfo,
		// c.animeList,
		// c.mangaList,
		// c.animeDetails,
		// c.mangaDetails,
		// c.animeRanking,
		// c.mangaRanking,
		// c.animeSeasonal,
		// c.animeSuggested,
		// c.animeListForLoop, // Warning: Many requests.
		// c.updateMyAnimeListStatus,
		// c.userAnimeList,
		// c.deleteMyAnimeListItem,
		// c.updateMyMangaListStatus,
		// c.userMangaList,
		// c.deleteMyMangaListItem,
		// c.forumBoards,
		// c.forumTopics,
		// c.forumTopicDetails,
	}
	for _, m := range methods {
		m(ctx)
	}
	if c.err != nil {
		return c.err
	}
	return nil
}

func (c *demoClient) userMyInfo(ctx context.Context) {
	if c.err != nil {
		return
	}
	u, _, err := c.User.MyInfo(ctx)
	if err != nil {
		c.err = err
		return
	}
	fmt.Printf("ID: %5d, Joined: %v, Username: %s\n", u.ID, u.JoinedAt.Format("Jan 2006"), u.Name)
}

func (c *demoClient) animeList(ctx context.Context) {
	if c.err != nil {
		return
	}
	anime, _, err := c.Anime.List(ctx, "hokuto no ken",
		mal.Fields{"rank", "popularity", "start_season"},
		mal.Limit(3),
		mal.Offset(0),
	)
	if err != nil {
		c.err = err
		return
	}
	for _, a := range anime {
		fmt.Printf("Rank: %5d, Popularity: %5d %s\n", a.Rank, a.Popularity, a.Title)
	}
}

func (c *demoClient) animeRanking(ctx context.Context) {
	if c.err != nil {
		return
	}
	rankings := []mal.AnimeRanking{
		mal.AnimeRankingAll,
		mal.AnimeRankingByPopularity,
	}
	for _, r := range rankings {
		fmt.Println("Ranking:", r)
		anime, _, err := c.Anime.Ranking(ctx, r,
			mal.Fields{"rank", "popularity"},
		)
		if err != nil {
			c.err = err
			return
		}
		for _, a := range anime {
			fmt.Printf("Rank: %5d, Popularity: %5d %s\n", a.Rank, a.Popularity, a.Title)
		}
		fmt.Println("--------")
	}
}

func (c *demoClient) mangaRanking(ctx context.Context) {
	if c.err != nil {
		return
	}
	manga, _, err := c.Manga.Ranking(ctx,
		mal.MangaRankingByPopularity,
		mal.Fields{"rank", "popularity"},
		mal.Limit(6),
	)
	if err != nil {
		c.err = err
		return
	}
	for _, m := range manga {
		fmt.Printf("Rank: %5d, Popularity: %5d %s\n", m.Rank, m.Popularity, m.Title)
	}
}

func (c *demoClient) animeSeasonal(ctx context.Context) {
	if c.err != nil {
		return
	}
	anime, _, err := c.Anime.Seasonal(ctx, 2020, mal.AnimeSeasonFall,
		mal.Fields{"rank", "popularity"},
		mal.SortSeasonalByAnimeNumListUsers,
		mal.Limit(3),
		mal.Offset(0),
	)
	if err != nil {
		c.err = err
		return
	}
	for _, a := range anime {
		fmt.Printf("Rank: %5d, Popularity: %5d %s\n", a.Rank, a.Popularity, a.Title)
	}
}

func (c *demoClient) animeSuggested(ctx context.Context) {
	if c.err != nil {
		return
	}
	anime, _, err := c.Anime.Suggested(ctx,
		mal.Limit(3),
		mal.Fields{"rank", "popularity"},
	)
	if err != nil {
		c.err = err
		return
	}
	for _, a := range anime {
		fmt.Printf("Rank: %5d, Popularity: %5d %s\n", a.Rank, a.Popularity, a.Title)
	}
}

func (c *demoClient) forumBoards(ctx context.Context) {
	if c.err != nil {
		return
	}
	forum, _, err := c.Forum.Boards(ctx)
	if err != nil {
		c.err = err
		return
	}
	for _, category := range forum.Categories {
		fmt.Printf("%s\n", category.Title)
		for _, b := range category.Boards {
			fmt.Printf("|-> %s\n", b.Title)
			for _, b := range b.Subboards {
				fmt.Printf("    |-> %s\n", b.Title)
			}
		}
		fmt.Println("---")
	}
}

func (c *demoClient) forumTopics(ctx context.Context) {
	if c.err != nil {
		return
	}
	topics, _, err := c.Forum.Topics(ctx,
		mal.Query("JoJo opening"),
		mal.SortTopicsRecent,
		mal.Limit(2),
	)
	if err != nil {
		c.err = err
		return
	}
	for _, t := range topics {
		fmt.Printf("ID: %5d, Title: %5q created by %q\n", t.ID, t.Title, t.CreatedBy.Name)
	}
}

func (c *demoClient) forumTopicDetails(ctx context.Context) {
	if c.err != nil {
		return
	}
	topicDetails, _, err := c.Forum.TopicDetails(ctx, 1877721, mal.Limit(3), mal.Offset(0))
	if err != nil {
		c.err = err
		return
	}
	fmt.Printf("Topic title: %q\n", topicDetails.Title)
	if topicDetails.Poll != nil {
		fmt.Printf("Poll: %q\n", topicDetails.Poll.Question)
		for _, o := range topicDetails.Poll.Options {
			fmt.Printf("- %-25s %2d\n", o.Text, o.Votes)
		}
	}
	for _, p := range topicDetails.Posts {
		fmt.Printf("Post: %2d created by %q\n", p.Number, p.CreatedBy.Name)
	}
}
