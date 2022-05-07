import {Tab} from "./Tab";
import {useState} from "react";
import './TabList.css';

function TabList(props) {
    const [activeTab, setActiveTab] = useState(props.children[0].key);

    return <div className="tabs">
        <ul className="tab-list">
            {props.children.map(child =>
                <Tab key={child.key}
                     label={child.key}
                     activeTab={activeTab}
                     onClickTab={(label) => setActiveTab(label)}/>)}
        </ul>
        {props.children.map(child => activeTab === child.key && child)}
    </div>;
}

export default TabList;