import { css } from "@repo/panda-config/css";
import { FC } from "react";


export interface PageEmuratorProps { }

export const PageEmurator: FC<PageEmuratorProps> = () => {
  return (
    <main className={css({
      display: 'flex',
      flexDirection: 'column',
      bg: 'bg.error',
      color: 'contents.error',
      borderRadius: 'outer'
    })}>

      <header
        className={css({
          display: 'flex',
          gap: '3',
          paddingX: '4',
          paddingY: '3',
          justifyContent: 'center',
        })}
      >
        <div className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '2',
          flex: '1',
        })}>
          <div className={css({
            display: 'inline-block',
            padding: '1',
            bg: 'accent.error',
            borderRadius: 'full',
          })} />
          <div className={css({
            display: 'inline-block',
            padding: '1',
            bg: 'accent.warn',
            borderRadius: 'full',
          })} />
          <div className={css({
            display: 'inline-block',
            padding: '1',
            bg: 'accent.sccess',
            borderRadius: 'full',
          })} />

        </div>

        <p className={css({
          flex: 'none',
          textAlign: 'center',
        })}
        >
          このコンテンツ制御テスト
        </p>


        <div className={css({
          flex: '1',
        })}>

        </div>

      </header>
      <article>
        <div className={css({ padding: '32' })}>
          contents
        </div>
      </article>
      <footer className={css({
        paddingX: '4',
        paddingY: '3',
      })}>
        footer
      </footer>
    </main>
  )
}
