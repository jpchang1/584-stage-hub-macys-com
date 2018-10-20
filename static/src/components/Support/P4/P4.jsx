import React from "react";

const p4 = (props) => {
    return(
        <div className="p-body">
            <h1 className="support-title">
                Uploading Photos
            </h1>
            <div className="p-body">
                <ul className="l-decimal">
                    <li >Uploading, Merchandising and Sharing Photos to your Style Crew account will be available on the platform by the end of May 2018</li>
                    <li >In the meantime, you can upload and share photos on any social network. In doing so, make sure to obtain, copy and use the Product links from your Style Crew account together with such Photo to ensure traffic is directed to the respective product page (see Section 8 below titled <a href="#" onClick={ () => props.setActive(9)}>“Obtaining and Posting Product Links”</a>).</li>
                </ul>
            </div>
        </div>
    );
}
export default p4;