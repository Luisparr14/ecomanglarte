export default function InputSelect ({ id, width, height, text, options, placeHolder, backgroundColor, onChange }) {
  return (
    <>
      <label htmlFor={id} className="input-label">{text}</label>
      <select title={placeHolder} placeholder={placeHolder} id={id} className="input-select" onChange={onChange}>
        {options.map((option) => (
          <option key={option.id || option.codigo} value={option.id || option.codigo}>{option.nombre || option.articulo}</option>
        ))}
      </select>
      
      <style jsx>{`
        .input-select {
          width: ${width || '100%'};
          height: ${height || '40px'};
          border-radius: 5px;
          border: 1px solid var(--primaryColor);
          padding: 0 10px;
          margin: 5px 5px;
          font-size: 14px;
          background-color: ${backgroundColor || undefined};
        }
        .input-label {
          font-size: 14px;
          font-weight: bold;
          color: #000000;
          margin-bottom: 5px;
        }
      `}</style>
    </>
  )
}