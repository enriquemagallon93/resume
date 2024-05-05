import './Resume.scss'

import Header from './Header';
import Info from './Info'

const Resume = () => {
  return (
    <>
      <div className='page'>
        <Header />
        <Info />
        <div className='resume-body'>
          <h2>Education</h2>
          <h3>
            BS: System Engineering | Utel | <i>Aug 2020 </i> | Naucalpan, Mexico
          </h3>
            <br/>
          <h2>Employment history</h2>
          <div>
            <h3>
              <a target='_blank' href="https://www.housecallpro.com/">Housecall Pro</a> | Sr. React Engineer | <i>Jun 2022 - Present</i> | Fully remote
            </h3>
            <p> <b>HCP Core:</b> </p>
            <p>
              I worked in multiple cross-team efforts to incorporate new onboarding functionality, maintain and migrate legacy code. These are some highlights:
            </p>
            <ul>
              <li>
                Designed and implemented from start to finish a new React component that touched the domain of 16 squads and was visible for billions of users as it was implemented on every page. This was a difficult challenge as it required the component to let other non-React elements to work with it. The solution required approvals from many people including product owners, team leaders and staff engineers.
              </li>
              <li>
                Changed Github workflows in the design system repository to improve the way developers had to test feature branches in other repositories.
              </li>
              <li>
                Led and participated in code interviews for both, React and Ruby on Rails Senior candidates
              </li>
            </ul>
            <p> <b>Conquer:</b> </p>
            <p>
              I collaborated with my teammates to create an LMS (Learning management system) in a greenfield project. These are some of my achievements:
            </p>
            <ul>
              <li>
                I installed and set up typescript to the React App
              </li>
              <li>
                Added storybook and play functions for integration tests
              </li>
              <li>
                Designed a rich text editor that uses the slate library to either serialize text into JSON and deserialize JSON into HTML.
              </li>
            </ul>
          </div>
          <div>
            <h3>
              <a target='_blank' href="https://bitso.com/">Bitso</a> | Sr. React Engineer | <i>Aug 2021 - May 2022</i> | Fully remote
            </h3>
            <ul>
              <li>
                With Next JS and Contentful, I created a blog where the marketing team was able to publish content about crypto in English, Spanish and Portuguese.
              </li>
              <li>
                I actively helped to improve internal tooling; One of the main tools was used in an effort to gradually split the monorepository we worked with.
              </li>
              <li>
                Created a React library to expose providers and common components to other repositories.
              </li>
              <li>
                Helped as shadow in the code challenge interviews for React candidates
              </li>
            </ul>
          </div>
          <div>
            <h3>
              <a target='_blank' href="https://www.globant.com/">Globant</a> | Web UI | <i>Mar 2017 - Jul 2021</i> | Mexico city
            </h3>
            <ul>
              <li>
                I provided high level web development and maintenance support to international companies such as Intercom, LendingClub and Realogy.
              </li>
              <li>
                Delivered high quality React code and pages with special emphasys in SEO and performance.
              </li>
              <li>
                Got the promotion to the Sr level after 3 years of working as a junior developer.
              </li>
            </ul>
          </div>
          <div>
            <h3>
              <a target='_blank' href="https://www.blackcore.mx/">Blackcore</a> | Fullstack developer | <i>Oct 2016 - Mar 2017</i> | Leon, Mexico
            </h3>
            <ul>
              <li>
                Developed Vue components for accounting and inventory control applications.
              </li>
              <li>
                Implemented REST API services using nodejs and Mongo DB.
              </li>
            </ul>
          </div>
          <div>
            <h3>
              <a target='_blank' href="https://mvsradio.com/">MVS Radio</a> | Web developer | <i>Aug 2013 - Sep 2016</i> | Mexico city
            </h3>
            <ul>
              <li>
                Created various advertising and social dynamics microsites, including mini games, simple image composition editors, trivia and social challenges.
              </li>
              <li>
                Implemented REST API services using nodejs and Mongo DB.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='page page2'>
        <div className='resume-body'>
          <ul>
            <li>
              Was in charge of the websites of some clients (Dish, Exa FM, Infonavit, Jumex).
            </li>
            <li>
              Developed a fully in-house CMS for dish.com.mx
            </li>
          </ul>
          <br />
          <h2>
            Soft Skills
          </h2>
          <ul>
            <li>
              Responsible
            </li>
            <li>
              Committed to the team deliveries
            </li>
            <li>
              Friendly
            </li>
            <li>
              Communicative
            </li>
            <li>
              Creative
            </li>
            <li>
              Focused on quality
            </li>
          </ul>
          <br />
          <h2>Certificates</h2>
          <h3>Bash Scripting and Shell programming | Udemy | <i> Feb 2021 </i></h3>
          <p>
            <a className='blue' target='_blank' href="https://www.udemy.com/certificate/UC-87e0221a-4e36-4a94-870b-c44d9a4fa04a/?utm_campaign=email&utm_source=sendgrid.com&utm_medium=email">
            https://www.udemy.com/certificate/UC-87e0221a-4e36-4a94-870b-c44d9a4fa04a/?utm_campaign=email&utm_source=sendgrid.com&utm_medium=email
            </a>
          </p>
          <h3>Problem Solving | Hacker rank | <i>Sep 2020</i> </h3>
          <p>
            <a className='blue' target='_blank' href="https://www.hackerrank.com/certificates/80815a388da2">
              https://www.hackerrank.com/certificates/80815a388da2
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Resume
