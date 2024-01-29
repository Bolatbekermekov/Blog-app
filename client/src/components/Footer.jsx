import {Footer} from 'flowbite-react'
import { Link } from 'react-router-dom';

export default function FooterCom(){
  return(
    <Footer container className='border border-t-8 border-teal-500'>
      <div className=''>
        <div className=''>
          <div className=''>
            <Link
            to='/'
            className='self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white'
          >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Full Course's
            </span>
            Blog

          </Link>
          </div>
          <div className='grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>  <Footer.Title title='About'/>
            <Footer.LinkGroup col >
              <Footer.Link 
              href="https://my.clevelandclinic.org/health/treatments/24601-teeth-braces"
              target='_blank'
              rel='noopener noreferrer'>
                Teeth Braces
              </Footer.Link>

              <Footer.Link 
              href="/about"
              target='_blank'
              rel='noopener noreferrer'>
                Bolatbek's Blog
              </Footer.Link>
            </Footer.LinkGroup>

            </div>

        <div>  
              <Footer.Title title='Follow us'/>
                <Footer.LinkGroup col >
                  <Footer.Link 
                  href="https://github.com/Bolatbekermekov"
                  target='_blank'
                  rel='noopener noreferrer'>
                        Github
                  </Footer.Link>

                  <Footer.Link 
                    href="#"
                    target='_blank'
                    rel='noopener noreferrer'>
                        Discord
                  </Footer.Link>
                  </Footer.LinkGroup>
                  </div>

                  <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
            </div>

           
        </div>
      </div>  
    </Footer>
  
  )
}