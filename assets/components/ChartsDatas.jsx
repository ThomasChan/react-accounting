import React, { Component } from 'react'
import Chart from 'rc-echarts/src/'

export default class ChartsDatas extends Component {

	constructor(props) {
		super(props)
	}

    shouldComponentUpdate(nextProps, nextStates) {
        let isEqual = JSON.stringify(nextProps.data) == JSON.stringify(this.props.data)
        console.log(isEqual)
        if (nextProps.pending || isEqual) {
            return false
        }
        return true
    }

	render() {
        const options = {
            height : this.props.data.height,
            title : {
                text: '收支趋势'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['收入','支出']
            },
            toolbox: {
                show : true,
                feature : {
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar', 'pie', 'cloud', 'map', 'graph']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data: this.props.data.month,
                    boundaryGap: ['5%', '5%']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ]
        }

        return <Chart {...options}>
            <Chart.Line name="收入" data={this.props.data.shouru} showAllSymbol={true} smooth={true}/>
            <Chart.Line name="支出" data={this.props.data.zhichu} showAllSymbol={true} smooth={true}/>
        </Chart>
	}

}
