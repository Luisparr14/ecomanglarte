export default function InputText ({ type, placeHolder, id, background, onChange, value }) {
  return (
    <>
      <div className="input-container">
        <label htmlFor={id} className="input-label">{placeHolder}</label>
        <input autoComplete="true" title={placeHolder} id={id} className="input" type={type} placeholder={placeHolder} onChange={onChange} value={value} min={0} max={1000} />
      </div>
      <style jsx>{`
        .input-container{
          display:flex;
          flex-direction: column;
          width: 80%;
          height: auto;
          margin: 0px auto;
        }
        .input {
          height: 30px;
          width: 100%;
          border-radius: 5px;
          border: 1px solid var(--primaryColor);
          padding: 0 10px;
          font-size: 14px;
          background-color: ${background || undefined};
        }
        .input-label{
          font-size: 16px;
          text-align: left;
          margin: 5px 0;
        }

        @media (min-width: 768px) {
          .input-container{
            width: 40%;
          }
        }
      `}</style>
    </>
  )
}
