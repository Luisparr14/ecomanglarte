export default function Button ({ title, backGroundColor, borderRadius, width, height, margin, onClick }) {
  return (
    <button onClick={onClick}>
      {title}
      <style jsx>{`
          button {
            display: flex;
            align-items: center;
            background-color: ${backGroundColor};
            color: #000;
            border: 2px solid rgba(255, 255, 255, 0);
            border-radius: ${borderRadius || '10px'};
            padding: 10px;            
            height: 25px;
            font-family: Roboto sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 23px;
            line-height: 23px;
            cursor: pointer;
            margin: 5px 0;
            justify-content: center;
            margin: ${margin || undefined};
          }
          button:hover {
            border-color: var(--primaryColor);
          }

          @media (min-width: 375px) {
            button {
              font-size: 25px;
              height: 30px;
            }
          }
          
          @media (min-width: 768px) {
          button{
            
          }
        }
        `}</style>
    </button>
  )
}