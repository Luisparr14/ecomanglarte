import SocialMedia from '../../SocialMedia'
export default function Footer () {
  return (
    <>
      <footer className='footer'>
        <SocialMedia
          src={'/images/social-medias/instagram.png'}
          href='https://www.instagram.com/'
          alt={'instagram'}
          width={'30px'}
          height={'30px'}
        />
        <SocialMedia
          src={'/images/social-medias/facebook.png'}
          href='https://www.facebook.com/'
          alt={'facebook'}
          width={'30px'}
          height={'30px'}
        />
        <SocialMedia
          src={'/images/social-medias/gmail.png'}
          href='mailto:luisparr14@gmail.com'
          alt={'gmail'}
          width={'30px'}
          height={'30px'}
        />
      </footer>
      <style jsx>{`
        .footer {
          display: flex;
          height: 50px;
          width: 100vw;
          background-color: #a4a4a4;
          justify-content: space-evenly;
          align-items: center;
          background: rgba(207, 96, 96);
        }
        .container{
          height: 200px;
        }
      `}</style>
    </>
  )
}
