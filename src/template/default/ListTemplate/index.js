import React, { Component } from 'react';
// import defaultTemplateMapping from '../defaultTemplateMapping';
import { View, Text as RawText, StyleSheet, InteractionManager } from 'react-native';
import { AppDispatcher, Util, DynamicControl, internationalWrap } from 'yes';
// import Controls from '../../control';
import { withNavigation } from 'react-navigation';
// import internationalWrap from '../../controls/InternationalWrap';
import PropTypes from 'prop-types';
import { ListControl } from 'yes-designer/components/Framework/YigoControl';
import Element from 'yes-designer/components/Framework/Element';
import { observer } from 'mobx-react';
import designExport from 'yes-designer/utils/DesignExport';
import Searchbar from 'yes-control-default/Searchbar';

const styles = StyleSheet.create({
    listView: {
        // paddingLeft: 16,
        flex:1,
    },
    primaryTextLayout: {
        justifyContent: 'flex-start',
    },
    primaryContainer: {
        flexDirection: 'row',
        lineHeight: 24,
        paddingBottom: 6,
    },
    primaryText: {
        fontSize: 17,
        whiteSpace: 'pre',
    },
    secondaryContainer: {
        flexDirection: 'row',
        lineHeight: 14,
        paddingBottom: 6,
    },
    secondaryText: {
        fontSize: 13,
        color: 'rgba(0,0,0,0.5)',
    },
});
const defaultValue = {
    formTemplate: 'list',
    head: Element.defaultValue,
    searchBar: Searchbar.defaultValue,
    list: ListControl.defaultValue,
};
const editor = [
    {
        type: 'SubForm',
        key: 'searchBar',
        isGroup: true,
        control: Searchbar,
    }, {
        type: 'SubForm',
        key: 'list',
        isGroup: true,
        control: ListControl,
    }
];

@observer
class ListTemplate extends Component {
    static contextTypes = {
        getControl: PropTypes.func,
    }
    onRefresh = () => {
        AppDispatcher.dispatch({
            type: 'RELOADFORM',
            key: Util.buildFormKey(this.props.formKey, '-1'),
        });
    }
    state = {
        ready: false,
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            () => {
                this.setState({
                    ready: true,
                });
            }
            // this._focusFirstTextInput
        );
        // super.componentDidMount();
    }
    render() {
        // if (!this.state.ready) {
        //     return null;
        // }
        const { searchBar, list, head } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Element
                    meta={head}
                />
                <Searchbar
                    visible
                    designPositionBase
                    meta={searchBar}
                    yigoid={searchBar.textField}
                    textField={searchBar.textField}
                    searchButton={searchBar.queryButton}
                    placeholder={this.props.formatMessage('search taskid')}
                />
                <View style={styles.listView}>
                    <ListControl
                        designPositionBase
                        debugStyle={{flex:1}}
                        layoutStyles={{flex: 1}}
                        style={{ flex: 1, marginLeft: 12 }}
                        meta={list}
                    />
                </View>
            </View>
        );
    }
}
const ListWithNavigation = designExport(withNavigation(internationalWrap(ListTemplate)), defaultValue, editor);

// ListWithNavigation.fromJson = (json) => {
//     return new ListMeta(json);
// }
ListWithNavigation.caption = "单据列表模板";
// defaultTemplateMapping.reg('list', ListWithNavigation);
ListWithNavigation.key = "list";
export default ListWithNavigation;