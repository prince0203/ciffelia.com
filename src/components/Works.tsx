import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import SectionBox from './SectionBox'
import Typography from './Typography'
import WorkCard from './WorkCard'
import * as styles from '../styles/Works.module.scss'

const Works: React.FC = () => {
  const data = useStaticQuery<GatsbyTypes.WorksQuery>(graphql`
    query Works {
      contentfulWorkList(name: { eq: "FeaturedWorks" }) {
        entries {
          id
          title
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 512, quality: 80)
              }
            }
          }
          year
          tags
          url
        }
      }
    }
  `)

  if (typeof data.contentfulWorkList === 'undefined') {
    throw new Error('No entry named "FeaturedWorks" found.')
  }
  const works = data.contentfulWorkList.entries ?? []

  return (
    <SectionBox>
      <Typography>
        <h1>
          Works <small>制作物</small>
        </h1>

        <ul className={styles.workList}>
          {works.map((work) => (
            /* eslint-disable @typescript-eslint/no-non-null-assertion */
            <li key={work!.id}>
              <WorkCard
                title={work!.title!}
                imageData={
                  work!.image!.localFile!.childImageSharp!.gatsbyImageData
                }
                year={work!.year!}
                tags={(work!.tags ?? []) as string[]}
                url={work!.url!}
              />
            </li>
            /* eslint-enable @typescript-eslint/no-non-null-assertion */
          ))}
        </ul>
      </Typography>
    </SectionBox>
  )
}

export default Works
