import Image from "next/image";
import Link from "next/link";

export default function AgendasCard ({ id, imgLink, description, title, precio }) {

  return (
    <>
      <Link href={`/agendas/${id}`}>
        <a>
          <div className="agenda">
            <h3>{title}</h3>
            <div className="agenda-img">
              <Image
                src={imgLink}
                alt={title}
                width={200}
                height={250}
              />
            </div>
            <div className="agenda-descripcion">
              <p>{description}</p>
            </div>
            <div className="agenda-precio">
              <code>{precio}</code>
            </div>
          </div>
        </a>
      </Link>
      <style jsx>{`
        p{
          margin: 1px 5px;
        }
        .agenda{	
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          margin: 10px;
          padding: 10px;
          border-radius: 10px;
          background-color: #f5f5f5;
          max-width: 280px;
          min-width: 200px;
          height: 380px;
          width: 250px;
        }

        code{
          font-size: 20px;
          font-weight: bold;
        }

        h3{
          font-size: 20px;
          font-family: 'Coming Soon';
          margin: 0px;
          padding: 0px;
          flex: 0.1;
        }
        .agenda-img{
          background-color: #f5f5f5;
          flex: 0.6;
        }
        .agenda-descripcion{
          width: 100%;
          font-size: 16px;
          font-family: 'Coming Soon';
          margin: 0px;
          padding: 0px;
          flex: 0.8;
          height:  20px;
          overflow: auto;
        }
        .agenda-precio{
          flex: 0.1;
        }

        @media (min-width: 375px) {
        
        }
        @media (min-width: 768px) {
          h3{
            font-size: 17px;
            margin-bottom: 10px;
          }
        }
        @media (min-width: 1024px) {
          h3{
            font-size: 17px;
            margin-bottom: 10px;
          }
        }

          `}</style>`
    </>
  )
}