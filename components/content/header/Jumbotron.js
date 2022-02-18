export default function Jumbotron ({title}) {
  return (
    <>
      <div className="jumbotron">
          <h1 className="display-4">{title}</h1>
      </div>
      <style jsx>{`
        h1 {
          text-align: center;
          font-family: 'Concert One';
        }
        .jumbotron {
          display: flex;
          flex: 0.2;
          width: 100%;
          height: 100%;
          background-color: #a4a4a4;
          justify-content: center;
          align-items: center;
          margin: 10px 0px;
          background: rgba(207, 96, 96, 0.62);
          border-radius: 10px;
        }
      `}</style>
    </>
  )
}