import React from 'react';
import ContentLoader from "react-content-loader";

const Skeleton = () => {
    return (
        <ContentLoader
            className="pizza-block"
            speed={2}
            width={280}
            height={460}
            viewBox="0 0 280 460"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="6" y="276" rx="6" ry="6" width="257" height="26" />
            <rect x="7" y="310" rx="6" ry="6" width="256" height="60" />
            <rect x="7" y="391" rx="6" ry="6" width="89" height="30" />
            <circle cx="136" cy="134" r="125" />
            <rect x="121" y="382" rx="12" ry="12" width="142" height="46" />
        </ContentLoader>
    )
};

export default Skeleton;