import Image from "next/image";

export default function AgendasCard ({ imgLink, description, title }) {
  return (
    <>
      <div className="agenda">
        <h3>{title}</h3>
        <Image
          src={imgLink}
          alt={title}
          width={200}
          height={250}
        />
        <p>{description}</p>
      </div>
      <style jsx>{`
        .agenda{	
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 10px;
          padding: 10px;
          border-radius: 10px;
          background-color: #f5f5f5;

          h3{
            font-size: 20px;
            font-family: 'Coming Soon';
            margin: 0px;
            padding: 0px;
          }
          `}</style>`
    </>
  )
}