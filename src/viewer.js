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
      case "table-chart":
        elts.push(
          <TableChart key={i} style={n.style} {...n}/>
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
  const getRange = (vals, grouped, min, max) => {
    // min and max are seed values is given.
    // Assert all vals are numbers.
    vals.forEach(val => {
      if (val instanceof Array) {
        let [tmin, tmax] = getRange(val);
        if (grouped) {
          // Stacked so just add them together.
          tmin = tmax = tmin + tmax;
        }
        if (min === undefined || tmin < min) {
          min = tmin;
        }
        if (max === undefined || tmax > max) {
          max = tmax;
        }
      } else {
        val = +val;
        if (min === undefined || val < min) {
          min = val;
        }
        if (max === undefined || val > max) {
          max = val;
        }
      }
    });
    return [min, max];
  };
  const rebaseValues = (offset, vals) => {
    let rebasedVals = [];
    vals.forEach(val => {
      if (val instanceof Array) {
        rebasedVals.push(rebaseValues(offset, val));
      } else if (!isNaN(+val)) {
        rebasedVals.push(+val + offset);
      } else {
        rebasedVals.push(val);  // Not a number so return as is.
      }
    });
    return rebasedVals;
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
      let yAxisLabel = props.yAxisLabel;
      let barWidth = props.barWidth || {ratio: 0.5};
      let labels = props.labels ? this.props.labels : props.args.vals[0];
      let rows = props.labels ? labels.concat(props.args.vals) : props.args.vals;
      let colors = props.colors;
      let horizontal = props.horizontal;
      let padding = props.padding;
      let scale = props.scale;
      let chartPadding = props.chartPadding;
      let gap = props.gap;
      let style = props.style;
      let groups = props.stack ? [labels] : undefined;
      let yTickSize = props.yTickSize;
      let showLegend = props.hideLegend !== false;
      let xTickFormat = props.xTickFormat || "_";
      let yTickFormat = props.yTickFormat || "_";
      let yTickValues;
      if (yTickSize) {
        let values = [];
        let [minValue, maxValue] = getRange(rows.slice(1), props.stack, 0); // Slice off labels.
        if (typeof yTickSize === "string" && yTickSize.indexOf("%") >= 0) {
          // Make tick size a percent of maxValue.
          let precision = maxValue.toString().indexOf(".");
          var factor = Math.pow(10, precision < 0 ? -(maxValue.toString().length - 1): -precision);  // Avoid edge case.
          let scale = Math.round((maxValue) * factor) / factor;
          let percent = +yTickSize.substring(0, yTickSize.indexOf("%"));
          yTickSize = Math.round(scale * percent * 0.01, 0) || 1;  // avoid 0
        } else {
          yTickSize = +yTickSize;
        }
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
          item: {
            tile: {
              width: 0,
              height: 10,
            },
          }
        };
      } else {
        legend = {
          show: false,
        };
      }
      if (chartPadding) {
        if (chartPadding instanceof Array) {
          chartPadding = {
            top: chartPadding[0],
            right: chartPadding[1],
            bottom: chartPadding[2],
            left: chartPadding[3],
          }
        } // Otherwise, its undefine, scalar or object, which is fine.
      } else {
        // Legacy defaults.
        chartPadding = {
          top: 20,
          left: 35,
          bottom: 5,
        };
      }
      var chart = c3.generate({
        bindto: "#bar-chart",
        padding: chartPadding,
        data: {
          rows: rows,
          type: 'bar',
          groups: groups,
          order: null,
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
              top: 25,
            },
            tick: {
              values: yTickValues,
              format: (d, i) => {
                return formatTick(yTickFormat, d, i);
              },
            },
            label: {
              text: yAxisLabel,
              position: "outer-center",
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
      d3.selectAll(".c3-legend-item text").nodes().forEach(n => {
        // Put space between the tile and the label.
        d3.select(n).attr("transform", "translate(5)");
      });
      d3.selectAll(".c3-legend-item-tile").attr("stroke-linecap", "round");
      if (style) {
        // Apply global styles.
        Object.keys(style).forEach(selector => {
          let styles = style[selector];
          Object.keys(styles).forEach(style => {
            d3.selectAll(selector).style(style, styles[style]);
          });
        });
      }
      if (scale) {
        d3.selectAll("svg").attr("transform", "translate(" + ((scale - 1) / 2 * props.width) + "," + ((scale - 1) / 2 * props.height) + ") scale(" + scale + ")");
      }
    },
    render () {
      return (
        <div id="bar-chart" />
      );
    },
  });
  var TableChart = React.createClass({
    componentDidMount() {
      loadScript("/L104/d3.js", () => {
        this.componentDidUpdate();
      });
    },
    componentDidUpdate() {
      let props = this.props;
      let data = props.args.vals.slice(1); // Slice off labels.
      // The table generation function
      function tabulate(data, columns) {
        var table = d3.select("#chart").append("table"), //.attr("style", "margin-left: 400px"),
        thead = table.append("thead"),
        tbody = table.append("tbody");
        
        // append the header row
        if (false) {
          thead.append("tr")
            .selectAll("th")
            .data(columns)
            .enter()
            .append("th")
            .attr("style", "font-family: Arial") // sets the font style
            .attr("style", "font-size: 12px")
            .attr("style", "font-weight: 600")
            .text(function(column) { return column; });
        }

        // create a row for each object in the data
        var rows = tbody.selectAll("tr")
          .data(data)
          .enter()
          .append("tr");
        
        // create a cell in each row for each column
        var cells = rows.selectAll("td")
          .data(function(row) {
            return columns.map(function(column, i) {
              return {column: i, value: row[i]};
            });
          })
          .enter()
          .append("td")
          .attr("style", "font-family: Arial") // sets the font style
          .attr("style", "font-size: 12px")
          .attr("padding", "10")
          .html(function(d) { return d.value; });
        
        return table;
      }

      // render the table
      // let data = [{"date":"1-May-12","close":"68.13","open":"34.12"},{"date":"30-Apr-12","close":"63.98","open":"45.56"},{"date":"27-Apr-12","close":"67.00","open":"67.89"},{"date":"26-Apr-12","close":"89.70","open":"78.54"},{"date":"25-Apr-12","close":"99.00","open":"89.23"},{"date":"24-Apr-12","close":"130.28","open":"99.23"},{"date":"23-Apr-12","close":"166.70","open":"101.34"},{"date":"20-Apr-12","close":"234.98","open":"122.34"},{"date":"19-Apr-12","close":"345.44","open":"134.56"},{"date":"18-Apr-12","close":"443.34","open":"160.45"},{"date":"17-Apr-12","close":"543.70","open":"180.34"},{"date":"16-Apr-12","close":"580.13","open":"210.23"},{"date":"13-Apr-12","close":"605.23","open":"223.45"},{"date":"12-Apr-12","close":"622.77","open":"201.56"},{"date":"11-Apr-12","close":"626.20","open":"212.67"},{"date":"10-Apr-12","close":"628.44","open":"310.45"},{"date":"9-Apr-12","close":"636.23","open":"350.45"},{"date":"5-Apr-12","close":"633.68","open":"410.23"},{"date":"4-Apr-12","close":"624.31","open":"430.56"},{"date":"3-Apr-12","close":"629.32","open":"460.34"},{"date":"2-Apr-12","close":"618.63","open":"510.34"},{"date":"30-Mar-12","close":"599.55","open":"534.23"},{"date":"29-Mar-12","close":"609.86","open":"578.23"},{"date":"28-Mar-12","close":"617.62","open":"590.12"},{"date":"27-Mar-12","close":"614.48","open":"560.34"},{"date":"26-Mar-12","close":"606.98","open":"580.12"}];
      var peopleTable = tabulate(data, ["Reward", "Count"]);
    },
    render () {
      return (
        <div id="chart" />
      );
    },
  });
  var TimeseriesChart = React.createClass({
    componentDidMount() {
      loadScript("/L104/d3.js", () => {
        loadScript("/L104/c3.js", () => {
          this.componentDidUpdate();
        });
      });
    },
    componentDidUpdate() {
      let rows = [["x", "data1"]].concat(this.props.args.vals);
      let lineWidth = this.props.lineWidth;
      let colors = this.props.colors;
      let showAxis = this.props.hideAxis !== false;
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
          this.componentDidUpdate();
        });
      });
    },
    componentDidUpdate() {
      let cols = this.props.args.vals[0];
      let rows = this.props.args.vals;
      let colors = this.props.colors;
      let showAxis = this.props.hideAxis !== false;
      let lineWidth = this.props.lineWidth;
      let dotRadius = this.props.dotRadius;
      let [min, max] = getRange(rows.slice(1)); // Slice off labels.
      let pad = (max - min) / 4;
      rows = rebaseValues(pad - min, rows);  // val + pad - min
      let types = {}
      types[cols[0]] = "area";
      var chart = c3.generate({
        bindto: "#chart",
        padding: {
          top: -5,
          right: -20,
          bottom: -7,
          left: -20,
        },
        data: {
          rows: rows,
          types: types,
        },
        legend: {
          show: false,
        },
        axis: {
          x: {
            show: showAxis,
            padding: {
              left: 1,
              right: 1,
            },
          },
          y: {
            show: showAxis,
            padding: {
              left: 0,
              right: 0,
            }
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
      if (lineWidth) {
        d3.selectAll(".c3-line").style("stroke-width", lineWidth)
      }
      if (dotRadius) {
        d3.selectAll(".c3-circle").attr("r", dotRadius)
      }
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
