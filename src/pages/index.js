import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function AboutMeSection() {
  return (
    <section className="container margin-vert--xl">
      <div className="row">
        <div className="col col--6">
          <h2>About Me</h2>
          <p>Place holder ...</p>
        </div>
        <div className="col col--6">
          <img src="/img/profile-image.png" alt="Your Photo" className={styles.profileImage} />
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section className="container margin-vert--xl">
      <h2>Projects & Releases</h2>
      <div className="row">
        {/* Project 1 */}
        <div className="col col--4">
          <div className={clsx('card', styles.projectCard)}>
            <div className="card__header">
              <h3>Project Title 1</h3>
            </div>
            <div className="card__body">
              {/* Image for Project 1 */}
              <img src="/img/project-image-01.png" alt="Project 1" className={styles.projectImage} />
              <p>Place holder ...</p>
            </div>
            <div className="card__footer">
              <Link to="/docs/project1" className="button button--secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Project 2 */}
        <div className="col col--4">
          <div className={clsx('card', styles.projectCard)}>
            <div className="card__header">
              <h3>Project Title 2</h3>
            </div>
            <div className="card__body">
              {/* Image for Project 2 */}
              <img src="/img/project-image-01.png" alt="Project 2" className={styles.projectImage} />
              <p>Place holder ...</p>
            </div>
            <div className="card__footer">
              <Link to="/docs/project2" className="button button--secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Project 3 */}
        <div className="col col--4">
          <div className={clsx('card', styles.projectCard)}>
            <div className="card__header">
              <h3>Project Title 3</h3>
            </div>
            <div className="card__body">
              {/* Image for Project 3 */}
              <img src="/img/project-image-01.png" alt="Project 3" className={styles.projectImage} />
              <p>Place holder ...</p>
            </div>
            <div className="card__footer">
              <Link to="/docs/project3" className="button button--secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Learn about my game development journey, projects, and how to contact me">
      <AboutMeSection />
      <ProjectsSection />
    </Layout>
  );
}
