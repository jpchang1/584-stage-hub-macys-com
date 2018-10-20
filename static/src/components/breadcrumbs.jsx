import React from "react";
import { Link } from "react-router-dom";

const breadcrumbsStructureData = (listOfItems) => {
    let schema  = document.createElement("script");
    let data = [];
    let items = [];
    listOfItems.forEach((element,index) => {
        let content = {
            "@type" : "ListItem",
            "position" : index,
            "item" : {
                "@id" : element.url,
                "name" : element.name
            }
        }
        items.push(content);
    });
    let schemaStructure = {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items
    };
    data.push(schemaStructure);
    schema.type="application/ld+json";
    schema.text = JSON.stringify(data);
    document.querySelector("head").appendChild(schema);
}

const breadcrumbs = props => {
    let list = null;
    list = [{
        url : TVSite.baseUrl,
        name : "Video Home"
    }];
    if(TVSite.channelVideosData && "id" in TVSite.channelVideosData && TVSite.isPlayerPage)
        list =  [...list,{
            url:("/c/"+TVSite.channelVideosData.titleTextEncoded.toLowerCase()+"/"+TVSite.channelVideosData.id+"/"),
            name : TVSite.channelVideosData.title
        }];

    breadcrumbsStructureData(list);
    return(
        <div className="col-xs-12">
        <ul className="tvp-breadcrumbs">
            {list.map((item,index)=>{
                return (<li itemScope itemType="http://data-vocabulary.org/Breadcrumb" key={index}>
                    <Link itemProp="url" to={item.url}>
                        <span itemProp="title">{item.name}</span>
                    </Link>
                </li>)
            })}
            </ul>
        </div>
    );
}
 export default breadcrumbs;