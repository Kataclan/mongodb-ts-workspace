import * as React from 'react';

var SwipeCore: any = require('react-swipeable-views-core');
var SwipeUtils: any = require('react-swipeable-views-utils');
import SwipeableViews from 'react-swipeable-views';
const EnhancedSwipeableViews = SwipeUtils.virtualize(SwipeableViews);




interface SwipeMenuProps {
    categories: Array<string>;
    categoryIndex: number;
    height: number;
    onChangeIndex: (index: number) => void;
}
export class SwipeMenu extends React.Component<SwipeMenuProps, {}>{
    constructor() {
        super();
        this.slideRenderer = this.slideRenderer.bind(this);
    }

    slideRenderer(props: any) {
        const {
            index,
            key,
        } = props;
        let innerStyle = {
            textAlign: 'center',
            padding: '0.1 em',
        };
        var max = this.props.categories.length;
        var idx = SwipeCore.mod(index, max);
        return (
            <div key={key} style={{
                height: '100%',
                color: '#777',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
            }}>
                <div style={(Object as any).assign({}, innerStyle, this.props.categoryIndex === idx ? { color: 'white' } : { color: 'rgba(255, 255, 255, 0.5)' })}>
                    {this.props.categories[idx]}
                </div>
            </div>
        );
    }

    render() {
        const styles = {
            slide: {
                height: 40,
                color: '#777',
                fontSize: 20,
            },
            innSlide: {
                textAlign: 'center',
                padding: '0.1em',
                marginTop: '0.1em'
            }
        };
        const index = this.props.categoryIndex;
        return (
            <div style={{ width: '100%', height: this.props.height, backgroundColor: '#8d00cd' }}>
                <EnhancedSwipeableViews
                    animateTransitions={true}
                    slideRenderer={this.slideRenderer}
                    overscanSlideCount={1}
                    index={index}
                    style={{ padding: '0 26%', backgroundColor: '#8d00cd', height: '100%' }}
                    slideStyle={{ padding: '0 0px' }}
                    onChangeIndex={
                        (index: number, idxLatest: number) => {
                            var max = this.props.categories.length;
                            var idx = SwipeCore.mod(index, max);
                            this.props.onChangeIndex(idx);
                        }
                    }
                />
            </div>
        );
    }
}
