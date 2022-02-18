export default function InputSelect ({ id, width, height, text, options, placeHolder, backgroundColor, onChange, value }) {
  return (
    <>
      <div className="select-container">
        <label htmlFor={id} className="input-label">{text}</label>
        <select value={value} title={placeHolder} placeholder={placeHolder} id={id} className="input-select" onChange={onChange}>
          {options.map((option) => (
            <option key={option.id || option.codigo} value={option.id || option.codigo}>{option.nombre || option.articulo}</option>
          ))}
        </select>
      </div>
      <style jsx>{`
        .select-container{
          height: auto;
          display: flex;
          flex-direction: column;
          width: 80%;
          background-color: ${backgroundColor || undefined};
          margin: 0px auto;
        }
        .input-select {
          border-radius: 10px;
          height:30px;
          width: 100%;
          border: 1px solid var(--primaryColor);
          padding: 0 10px;
          font-size: 14px;
          background-color: ${backgroundColor || undefined};
        }
        .input-label {
          font-size: 14px;
          font-weight: bold;
          color: #000000;
          margin-bottom: 5px;
        }
        
        @media (min-width: 768px) {
          .select-container{
            width: 40%;
          }
        }
      `}</style>
    </>
  )
}