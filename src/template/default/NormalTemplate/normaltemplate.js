import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
// import defaultTemplateMapping from '../defaultTemplateMapping';
import CellLayoutTemplate from '../TabTemplate/CellLayoutTemplate';
import designExport from 'yes-designer/utils/DesignExport';
import Element from 'yes-designer/components/Framework/Element';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexBasis: 0,
    },
});
class NormalTemplate extends Component {
    render() {
        const { head, foot, content } = this.props;
        return (<View style={{ flex: 1, backgroundColor: 'white' }}>
            <Element
                meta={head}
            />
            <ScrollView style={{ flex: 1 }} >
                <CellLayoutTemplate
                    meta={content}
                    designPositionBase
                />
            </ScrollView>
            <Element
                designPositionBase
                meta={foot}
            />
        </View>);
    }
}
const defaultValue = {
    formTemplate: 'normal',
    head: Element.defaultValue,
    foot: Element.defaultValue,
    content: {
        isGroup: true,
        hideTitle: true,
        items: [],
    },
}

const editor = [
    {
        type: 'SubForm',
        key: 'head',
        isGroup: true,
        control: Element,
    },
    {
        type: 'SubForm',
        key: 'foot',
        isGroup: true,
        control: Element,
    },
]
// const WrappedNormalTemplate = getMappedComponentHOC(NormalTemplate);
const DesignableNormalTemplate = designExport(NormalTemplate, defaultValue, editor);
DesignableNormalTemplate.caption = "单列表模板";
DesignableNormalTemplate.key = "normal";
// defaultTemplateMapping.reg('normal', DesignableNormalTemplate);
export default DesignableNormalTemplate;