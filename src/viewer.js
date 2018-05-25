/* Copyright (c) 2017, Art Compiler LLC */
/* @flow */
import {
  assert,
  message,
  messages,
  reserveCodeRange,
  decodeID,
  encodeID,
} from "./share.js";
import * as React from "react";
window.gcexports.viewer = (function () {
  function loadScript(src, resume) {
    var script = document.createElement("script");
    script.onload = resume;
    script.src = src;
    script.type = "text/javascript";
    script.async = true;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
  function loadStyle(src, resume) {
    var link = document.createElement("link");
    link.onload = resume;
    link.href = src;
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  function capture(el) {
    return null;
  }
  function render(nodes, props) {
    let elts = [];
    if (!(nodes instanceof Array)) {
      // HACK not all arguments are arrays. Not sure they should be.
      nodes = [nodes];
    }
    nodes.forEach(function (n, i) {
      let args = [];
      if (n.args) {
        args = render(n.args, props);
      }
      switch (n.type) {
      case "container":
        elts.push(
          <div className="container" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "container-fluid":
        elts.push(
          <div className="container-fluid" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "table":
        elts.push(
          <table key={i} style={n.style} {...n.attrs}>
            {args}
          </table>
        );
        break;
      case "thead":
        elts.push(
          <thead key={i} style={n.style} {...n.attrs}>
            {args}
          </thead>
        );
        break;
      case "tbody":
        elts.push(
          <tbody className="container" key={i} style={n.style} {...n.attrs}>
            {args}
          </tbody>
        );
        break;
      case "tr":
        elts.push(
          <tr key={i} style={n.style} {...n.attrs}>
            {args}
          </tr>
        );
        break;
      case "th":
        elts.push(
          <th key={i} style={n.style} {...n.attrs}>
            {args}
          </th>
        );
        break;
      case "td":
        elts.push(
          <td key={i} style={n.style} {...n.attrs}>
            {args}
          </td>
        );
        break;
      case "row":
      case "col":
      case "col-sm":
      case "col-sm-4":
        elts.push(
          <div className={n.type} key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "col-sm":
        elts.push(
          <div className="col-sm" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "bar-chart":
        elts.push(
          <BarChart key={i} style={n.style} {...n}/>
        );
        break;
      case "timeseries-chart":
        elts.push(
          <TimeseriesChart key={i} style={n.style} {...n}/>
        );
        break;
      case "area-chart":
        elts.push(
          <AreaChart key={i} style={n.style} {...n}/>
        );
        break;
      case "twoColumns":
        elts.push(
          <div className="two columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "threeColumns":
        elts.push(
          <div className="three columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "fourColumns":
        elts.push(
          <div className="four columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "fiveColumns":
        elts.push(
          <div className="five columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "sixColumns":
        elts.push(
          <div className="six columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "sevenColumns":
        elts.push(
          <div className="seven columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "eightColumns":
        elts.push(
          <div className="eight columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "nineColumns":
        elts.push(
          <div className="nine columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "tenColumns":
        elts.push(
          <div className="ten columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "elevenColumns":
        elts.push(
          <div className="eleven columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "twelveColumns":
        elts.push(
          <div className="twelve columns" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "oneThirdColumn":
        elts.push(
          <div className="one-third column" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "twoThirdsColumn":
        elts.push(
          <div className="two-thirds column" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "oneHalfColumn":
        elts.push(
          <div className="one-half column" key={i} style={n.style} {...n.attrs}>
            {args}
          </div>
        );
        break;
      case "h1":
        elts.push(
          <h1 key={i} style={n.style} {...n.attrs}>
            {args}
          </h1>
        );
        break;
      case "h2":
        elts.push(
          <h2 key={i} style={n.style} {...n.attrs}>
            {args}
          </h2>
        );
        break;
      case "h3":
        elts.push(
          <h3 key={i} style={n.style} {...n.attrs}>
            {args}
          </h3>
        );
        break;
      case "h4":
        elts.push(
          <h4 key={i} style={n.style} {...n.attrs}>
            {args}
          </h4>
        );
        break;
      case "h5":
        elts.push(
          <h5 key={i} style={n.style} {...n.attrs}>
            {args}
          </h5>
        );
        break;
      case "h6":
        elts.push(
          <h6 key={i} style={n.style} {...n.attrs}>
            {args}
          </h6>
        );
        break;
      case "br":
        elts.push(
          <br key={i} />
        );
        break;
      case "code":
        n.style.fontSize = n.style && n.style.fontSize ? n.style.fontSize : "90%";
        elts.push(
          <pre key={i} style={n.style} {...n.attrs}><code>
            {args}
          </code></pre>
        );
        break;
      case "cspan":
        elts.push(
          <code key={i} style={n.style} {...n.attrs}>
            {args}
          </code>
        );
        break;
      case "textarea":
        elts.push(
          <textarea className="u-full-width" key={i} rows="1" onChange={handleTextChange} style={n.style} {...n.attrs}>
          </textarea>
        );
        break;
      case "button":
        elts.push(
          <a className="button" key={i} style={n.style} {...n.attrs}>
            {args}
          </a>
        );
        break;
      case "ul":
        elts.push(
          <ul key={i} style={n.style} {...n.attrs}>
            {args}
          </ul>
        );
        break;
      case "ol":
        elts.push(
          <ol key={i} style={n.style} {...n.attrs}>
            {args}
          </ol>
        );
        break;
      case "li":
        elts.push(
          <li key={i} style={n.style} {...n.attrs}>
            {args}
          </li>
        );
        break;
      case "img":
        elts.push(
          <img key={i} style={n.style} {...n.attrs}/>
        );
        break;
      case "a":
        elts.push(
          <a key={i} style={n.style} {...n.attrs}>
            {args}
          </a>
        );
        break;
      case "title":
        document.title = n.value;
        break;
      case "graffito":
        // elts.push(
        //   <div key={i} style={{"position": "relative"}}>
        //     <iframe style={n.style} {...n.attrs}/>
        //     <a href={n.attrs.src} target="L116-CHILD" style={{
        //       "position": "absolute",
        //       "top": 0,
        //       "left": 0,
        //       "display": "inline-block",
        //       "width": "100%",
        //       "height": "100%",
        //       "zIndex": 5}}></a>
        //   </div>
        // );
        // elts.push(
        //   <div key={i} style={{"position": "relative"}}>
        //     <iframe style={n.style} {...n.attrs}/>
        //   </div>
        // );
        let src = n.attrs.src;
        let width = n.attrs.width;
        let height = n.style.height;
        elts.push(
          <HTMLView key={i} width={width} style={n.style} src={src} />
        );
        break;
      case "str":
        elts.push(<span className="u-full-width" key={i} style={n.style}>{""+n.value}</span>);
        break;
      default:
        break;
      }
    });
    return elts;
  }
  const getRange = (vals) => {
    let min = 0, max = 0;
    vals.forEach(val => {
      if (val instanceof Array) {
        let [tmin, tmax] = getRange(val);
        if (tmin < min) {
          min = tmin;
        }
        if (tmax > max) {
          max = tmax;
        }
      } else {
        val = +val;
        if (val < min) {
          min = val;
        }
        if (val > max) {
          max = val;
        }
      }
    });
    return [min, max];
  };
  const formatTick = (fmt, d) => {
    // If array, then use i to select format string.
    if (fmt instanceof Object) {
      return fmt[d] && fmt[d].replace("_", d);
    } else {
      return fmt.replace("_", d);
    }
  };
  var BarChart = React.createClass({
    componentDidMount() {
      loadScript("/L104/d3.js", () => {
        loadScript("/L104/c3.js", () => {
          this.componentDidUpdate();
        });
      });
    },
    componentDidUpdate() {
      let props = this.props;
      let xAxisLabel = props.xAxisLabel;
      let barWidth = props.barWidth || {ratio: 0.5};
      let labels = props.labels ? this.props.labels : props.args.vals[0];
      let rows = props.labels ? labels.concat(props.args.vals) : props.args.vals;
      let colors = props.colors;
      let horizontal = props.horizontal;
      let padding = props.padding;
      let gap = props.gap;
      let style = props.style;
      let groups = props.stack ? [labels] : undefined;
      let yTickSize = props.yTickSize;
      let showLegend = props.showLegend;
      let xTickFormat = props.xTickFormat || "_";
      let yTickFormat = props.yTickFormat || "_";
      let yTickValues;
      if (yTickSize) {
        let values = [];
        let [minValue, maxValue] = getRange(rows);
        minValue--;  // To show ticks.
        maxValue = maxValue + yTickSize;
        for (let i = minValue; i < maxValue - 1; i += yTickSize) {
          let value = Math.floor((i + yTickSize) / yTickSize) * yTickSize; 
          values.push(value);
        }
        yTickValues = values;
      }
      let legend;
      if (showLegend) {
        legend = {
          padding: 10,
          inset: {
            y: 10,
            anchor: "bottom-left",
          },
        };
      } else {
        legend = {
          show: false,
        };
      }
      var chart = c3.generate({
        bindto: "#bar-chart",
        padding: {
          top: 20,
          left: 35,
          bottom: 5,
        },
        data: {
          rows: rows,
          type: 'bar',
          groups: groups,
          order: "asc",
        },
        color: {
          pattern: colors,
        },
        bar: {
          width: barWidth,
        },
        size: {
          width: props.width,
          height: props.height,
        },
        axis: {
          x: {
            label: {
              text: xAxisLabel,
              position: "outer-center",
            },
            tick: {
              format: (d, i) => {
                return formatTick(xTickFormat, d, i);
              },
            },
          },
          y: {
            padding: {
              top: 15,
            },
            tick: {
              values: yTickValues,
              format: (d, i) => {
                return formatTick(yTickFormat, d, i);
              },
            },
          },
          rotated: horizontal,
        },
        grid: {
          y: {
            show: true,
            lines: [
              {value: 0}
            ]
          },
        },
        legend: legend,
      });
      if (gap && !groups) {
        if (labels.length === 2) {
          d3.selectAll(".c3-target-" + labels[0]).attr("transform", "translate(" + (-gap / 2) + ")");
          d3.selectAll(".c3-target-" + labels[1]).attr("transform", "translate(" + (gap / 2) + ")");
        }
      }
      let nodes = d3.selectAll(".c3-legend-item").nodes();
      nodes.forEach((n, i) => {
        if (nodes.length === 2) {
          if (i === 0) {
            d3.select(n).attr("transform", "translate(0, 5)");
          } else {
            d3.select(n).attr("transform", "translate(40, 5)");
          }
        }
      });
      // Make tiles round.
      d3.selectAll(".c3-legend-item-tile").nodes().forEach(n => {
        let x1 = +d3.select(n).attr("x1");
        d3.select(n).attr("x1", x1 + 5);
        d3.select(n).attr("x2", x1 + 5);
      });
      d3.selectAll(".c3-legend-item-tile").attr("stroke-linecap", "round");
      if (style) {
        Object.keys(style).forEach(selector => {
          let styles = style[selector];
          Object.keys(styles).forEach(style => {
            d3.selectAll(selector).style(style, styles[style]);
          });
        });
      }
    },
    render () {
      return (
        <div id="bar-chart" />
      );
    },
  });
  var TimeseriesChart = React.createClass({
    componentDidMount() {
      loadScript("/L104/d3.js", () => {
        loadScript("/L104/c3.js", () => {
          loadStyle("/L104/c3.css", () => {
            this.componentDidUpdate();
          });
        });
      });
    },
    componentDidUpdate() {
      let rows = [["x", "data1"]].concat(this.props.args.vals);
      let lineWidth = this.props.lineWidth;
      let colors = this.props.colors;
      let showAxis = this.props.showAxis;
      var chart = c3.generate({
        bindto: "#chart",
        data: {
          x: "x",
          rows: rows,
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
//                format: '%m-%d'
            },
            show: showAxis,
          },
          y: {
            show: showAxis,
          },
        },
        color: {
          pattern: colors,
        },
        legend: {
          show: false,
        },
        size: {
          width: this.props.width,
          height: this.props.height,
        },
      });
      if (this.props.lineWidth) {
        d3.selectAll(".c3-line").style("stroke-width", lineWidth)
      }
    },
    render () {
      return (
        <div id="chart" />
      );
    },
  });
  var AreaChart = React.createClass({
    componentDidMount() {
      loadScript("/L104/d3.js", () => {
        loadScript("/L104/c3.js", () => {
          loadStyle("/L104/c3.css", () => {
            this.componentDidUpdate();
          });
        });
      });
    },
    componentDidUpdate() {
      let labels = this.props.labels || ["data1"];
      let rows = [labels].concat(this.props.args.vals);
      let lineWidth = this.props.lineWidth;
      let colors = this.props.colors;
      let showAxis = this.props.showAxis;
      let dotRadius = this.props.dotRadius;
      let min = Math.min(...this.props.args.vals);
      let max = Math.max(...this.props.args.vals);
      let pad = (max - min) / 3;
      var chart = c3.generate({
        bindto: "#chart",
        data: {
          rows: rows,
          types: {
            data1: "area",
          },
        },
        legend: {
          show: false,
        },
        axis: {
          x: {
            show: showAxis,
          },
          y: {
            min: min - pad,
            show: showAxis,
          },
        },
        color: {
          pattern: colors,
        },
        size: {
          width: this.props.width,
          height: this.props.height,
        },
      });
    },
    render () {
      return (
        <div id="chart" />
      );
    },
  });
  var Viewer = React.createClass({
    componentDidUpdate() {
    },
    render () {
      // If you have nested components, make sure you send the props down to the
      // owned components.
      let props = this.props;
      var data = props.obj ? [].concat(props.obj) : [];
      var elts = render(data, props);
      return (
        <div>
        <link rel="stylesheet" href="https://l104.artcompiler.com/style.css" />
        <div className="L104">
          {elts}
        </div>
        </div>
      );
    },
  });
  return {
    capture: capture,
    Viewer: Viewer
  };
})();
