const metaPaths = require("../Config/metaPaths.json");

var  getMetaData = (category)=>{
    let metaData = []
    let groupsMeta = require(`${metaPaths[category]}/groups.json`);
    let entitiesMeta = require(`${metaPaths[category]}/entities.json`);
    let labelsMeta = require(`${metaPaths[category]}/labels.json`);
    if(groupsMeta.length > 0){
        metaData = addSubGroups(groupsMeta);
        metaData.forEach(groupMeta => {
            metaData.push(buildGroupData(groupMeta,entitiesMeta,labelsMeta));
        });
    }
    return metaData
}

function buildGroupData(group,entitiesMeta,labelsMeta,category){
     if(group && group.subGroups?.length > 0){
        group.subGroups.forEach(subGroup => {
            buildGroupData(subGroup,entitiesMeta,labelsMeta)
        });
    }
    if(group.parent_group){
    }
    if(group.label_id || group.desc_id || group.hint_id || group.toolTip_id){
        buildLabelData(group,labelsMeta);
    }
    // if(group.parent_group){
    // }
    if(group.entities?.length > 0){
        let entites = [];
        group.entities.forEach((entityId)=>{
            entites.push(buildEntityData(group,entityId,entitiesMeta,labelsMeta,group));
        })
        group.entities = entites;
    }
    delete group.label_id;
    delete group.desc_id;
    delete group.hint_id;
    delete group.toolTip_id;
    return group;
}

function buildEntityData(group,entityId,entitiesMeta,labelsMeta){
    let enitity ={};
    enitity = entitiesMeta.find((entityMeta)=> entityMeta.entity_id === entityId);
    if(enitity.label_id || enitity.desc_id || enitity.hint_id || enitity.toolTip_id){
        buildLabelData(enitity,labelsMeta);
    }
    enitity.group_id = group.group_id;
    delete enitity.label_id;
    delete enitity.desc_id;
    delete enitity.hint_id;
    delete enitity.toolTip_id;
    return enitity;
}

function buildLabelData(node,labelsMeta){
    if(node.label_id){
        node.label = labelsMeta.labels[node.label_id];
    }
    if(node.desc_id){
        node.description = labelsMeta.descriptions[node.desc_id];
    }
    if(node.hint_id){
        node.hint = labelsMeta.hints[node.hint_id];
    }
    if(node.toolTip_id){
        node.toolTip = labelsMeta.toolTips[node.toolTip_id];
    }
}

function addSubGroups(groups) {
    // Create a map for quick access to groups by their group_id
    const groupMap = new Map();
    groups.forEach(group => {
        group.subGroups = [];
        groupMap.set(group.group_id, group);
    });

    // Iterate through groups and add them to their parent group's subGroups array
    groups.forEach(group => {
        if (group.parent_group && groupMap.has(group.parent_group)) {
            groupMap.get(group.parent_group).subGroups.push(group);
        }
    });
    // Remove subGroups that are children from the top-level array
    const topLevelGroups = groups.filter(group => !group.parent_group || !groupMap.has(group.parent_group));
    // Return the updated array with subGroups added
    return topLevelGroups;
}
module.exports = {
    getMetaData
}