import React from 'react';

require('./style.sass');

const Advertisement = (props) => (
  <div className="advertisement">
      <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <ins class="adsbygoogle"
         style={{display:"inline-block",width:"728px",height:"90px"}}
         data-ad-client="ca-pub-5637984408924020"
         data-ad-slot="8853040790"></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
  </div>

);

export default Advertisement;
