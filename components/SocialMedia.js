import Image from "next/image";

export default function SocialMedia ({ src, alt, width, height, href }) {
  return (
    <>
      <div className='social-media'>
        <a href={href} rel="noreferrer" target="_blank">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
          />
        </a>
      </div>
      <style jsx>{`
        .social-media {
          cursor: pointer;
        }
        `}</style>
    </>
  )
}