import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts'

export default class ChartsDatas extends Component {

	constructor(props) {
		super(props)
        this.state = this.chartsConfig(props.data)
	}

    componentWillReceiveProps(nextProps) {
        this.setState(this.chartsConfig(nextProps.data))
    }

    chartsConfig(newState) {
        return {
            chart: {
                type: 'line',
                height: newState.height,
                backgroundColor: 'transparent'
            },
            colors: ['#61dafb', '#F75843'],
            title: {
                style: {
                    'font-size': '12px',
                    color: '#fff'
                },
                text: '收支详情'
            },
            legend: {
                style: {
                    color: '#000'
                },
                title: {
                    style: {
                        color: '#000'
                    }
                }
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#61dafb'
                    }
                },
                gridLineColor: '#61dafb',
                categories: newState.month
            },
            yAxis: {
                labels: {
                    style: {
                        color: '#F75843'
                    }
                },
                gridLineColor: '#F75843',
                title: {
                    style: {
                        color: '#F75843'
                    },
                    text: 'Money (￥元)'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        color: '#000',
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                color: '#61dafb',
                name: '收入',
                data: newState.shouru
            }, {
                color: '#F75843',
                name: '支出',
                data: newState.zhichu
            }]
        }
    }

	render() {
		return <ReactHighcharts config={this.state} />
	}

}
