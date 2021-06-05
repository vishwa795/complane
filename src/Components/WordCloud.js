import { TagCloud } from 'react-tagcloud';


const Wordcloud = (props) => (
    <TagCloud
      minSize={12}
      maxSize={35}
      tags={props.Wordcloud.cloud}
      //onClick={tag => alert(`'${tag.value}' was selected!`)}
    />
  )

export default Wordcloud