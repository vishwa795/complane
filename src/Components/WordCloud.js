import { TagCloud } from 'react-tagcloud';


const Wordcloud = (props) => (
    <TagCloud
      minSize={15}
      maxSize={35}
      tags={props.keywords}
      //onClick={tag => alert(`'${tag.value}' was selected!`)}
    />
  )

export default Wordcloud