import './Avatar.scss';

function Avatar({
    img_url,
    size
}) {
  return (
    <div className="left-block-avatar" style={{width: `${size}px` , height: `${size}px`}}>
      <img src={img_url} alt="avatar" />
    </div>
  )
}

export default Avatar;