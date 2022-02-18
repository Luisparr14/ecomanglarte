import SocialMedia from '../../SocialMedia'
export default function Footer () {
  return (
    <>
      <footer className='footer'>
        <SocialMedia
          src={'/images/social-medias/instagram.png'}
          href='https://www.instagram.com/ecomanglarte'
          alt={'instagram'}
          width={'30px'}
          height={'30px'}
        />
        <SocialMedia
          src={'/images/social-medias/facebook.png'}
          href='https://www.facebook.com/Ecomanglarte-204469986887154/'
          alt={'facebook'}
          width={'30px'}
          height={'30px'}
        />
        <SocialMedia
          src={'/images/social-medias/gmail.png'}
          href='mailto:ecomanglarte@gmail.com'
          alt={'gmail'}
          width={'30px'}
          height={'30px'}
        />
      </footer>
      <style jsx>{`
        .footer {
          display: flex;
          height: 50px;
          width: 100%;
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
