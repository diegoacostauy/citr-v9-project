export const Pizza = (props) => {
  return (
    <div className="pizza">
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <img src={props.img ?? 'https://picsum.photos/200' } alt={props.name} />
      {props.children && [...props.children]}
    </div>
  );
}
