import Image, { type ImageProps } from "next/image";
import { css } from "@repo/panda-config/css";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default async function Home() {
  const json = await import('@repo/mal-access/result.json');
  const animeList = Array.from(json).sort((a, b) => b.my_list_status.score - a.my_list_status.score);

  return (
    <ul className={css({
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6'
    })}>
      {
        animeList.map(anime => {
          return (
            <li key={anime.id}>
              <a className={css({
                display: 'flex',
                flexDirection: 'column',
                height: 'full',
                gap: '3',
                borderRadius: 'md',
                width: 'sm',
                bg: 'bg.secondary'
              })} target="_blank" href={`https://myanimelist.net/anime/${anime.id}`}>
                <img src={anime.main_picture.medium} width={300} height={600} className={css({
                  objectFit: 'contain',
                  width: 'full',
                  height: 'xl',
                  borderBottomStyle: 'solid',
                  borderWidth: 'thin',
                  borderColor: 'bg.info',
                  bg: 'bg.info',
                  flex: 'none',
                })} />
                <p className={css({
                })}>
                  {anime.alternative_titles.ja}
                </p>
                <p>
                  終了日: {anime.my_list_status.score}
                </p>
                <p className={css({ flex: '1' })}>
                  視聴済み: {anime.my_list_status.num_episodes_watched} / {anime.num_episodes}
                </p>

                <ul className={css({
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '2',
                })}>
                  {
                    anime.genres.map(genre => (
                      <li key={genre.id} className={css({
                        bg: 'bg.info',
                        borderRadius: 'full',
                        paddingX: '2',
                        paddingY: '1',
                      })}>
                        <p>
                          {genre.name}
                        </p>
                      </li>
                    ))
                  }
                </ul>

              </a>
            </li>
          )
        })
      }
    </ul>
  );
}
