// NEEDS https://github.com/jsdom/jsdom/pull/2129

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
// let d3 = require("d3");
// let c3 = require("../c3/c3.js");
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
        if (!isNaN(tmin) && min === undefined || tmin < min) {
          min = tmin;
        }
        if (!isNaN(tmax) && max === undefined || tmax > max) {
          max = tmax;
        }
      } else {
        val = +val;
        if (!isNaN(val) && min === undefined || val < min) {
          min = val;
        }
        if (!isNaN(val) && max === undefined || val > max) {
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
      // NOTE this is required because C3 loads the wrong version of D3
      // otherwise.
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
      let keys = { value: labels.slice(1) }; // Slice off first label label.
      let rows = props.labels ? labels.concat(props.args.vals) : props.args.vals;
      let colors = props.colors;
      let horizontal = props.horizontal;
      let scale = props.scale;
      let chartPadding = props.chartPadding;
      let gap = props.gap;
      let style = props.style;
      let groups = props.stack ? [labels.slice(1)] : undefined; // Slice off label label.
      let yTickSize = props.yTickSize;
      let showLegend = props.hideLegend !== true;
      let showXGrid = props.hideGrid !== true && props.hideXGrid !== true;
      let showYGrid = props.hideGrid !== true && props.hideYGrid !== true;
      let showXAxis = props.hideXAxis !== true;
      let showYAxis = props.hideYAxis !== true;
      let showYValues = !!props.showYValues;
      let xTickFormat = props.xTickFormat || "_";
      let yTickFormat = props.yTickFormat || "_";
      let width = props.width || "100%";
      let height = props.height || "100%";
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
      let padding;
      if (showLegend) {
        legend = {
          padding: 0,
          item: {
            tile: {
              width: .1,  // 0 doesn't work in phantomjs
              height: 10,
            },
          }
        };
        padding = {
          top: 0,
          right: 0,
          bottom: 5,
          left: 0,
        };
      } else {
        legend = {
          show: false,
        };
        padding = {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        };
      }
      if (chartPadding) {
        const yValueWidth = showYValues ? 13 : 0;
        if (chartPadding instanceof Array) {
          padding = {
            top: padding.top + chartPadding[0],
            right: padding.right + chartPadding[1] + yValueWidth,
            bottom: padding.bottom + chartPadding[2],
            left: padding.left + chartPadding[3],
          }
        } // Otherwise, its undefine, scalar or object, which is fine.
      }
      let json = [];
      rows.slice(1).forEach(vals => {
        let row = {};
        vals.forEach((val, i) => {
          row[labels[i]] = val;
        });
        json.push(row);
      });
      var chart = c3.generate({
        bindto: "#chart",
        padding: padding,
        data: {
          json: json,
          type: 'bar',
          groups: groups,
          keys: keys,
          order: null,
        },
        color: {
          pattern: colors,
        },
        bar: {
          width: barWidth,
        },
        size: {
          width: width,
          height: height,
        },
        axis: {
          x: {
            show: showXAxis,
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
            show: showYAxis,
            padding: {
              top: 25,
              bottom: 0,
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
          x: {
            show: showXGrid,
          },
          y: {
            show: showYGrid,
            lines: [
              {value: 0}
            ]
          },
        },
        legend: legend,
      });
      if (gap && !groups) {
        if (labels.length === 3) {
          let dx = horizontal ? 0 : gap / 2;
          let dy = horizontal ? gap / 2 : 0;
          d3.selectAll(".c3-target-" + labels[1]).attr("transform", "translate(" + -dx + "," + -dy + ")");
          d3.selectAll(".c3-target-" + labels[2]).attr("transform", "translate(" + dx + "," + dy + ")");
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
      d3.select("#graff-view").append("div").classed("done-rendering", true);
      let data = rows;
      if (showYValues) {
        tabulate(data, ["Frequency"]);
      }
      function tabulate(data, columns) {
        var topPadding = padding.top - 5 + chartPadding[0];
        var table = d3.select("#chart svg"),
            tbody = table.append("g");
        table
          .attr("width", width)
          .attr("height", height);

        // create a row for each object in the data
        let count = data.length;
        let dy = (height - 2) / count;
        let textSize = style.tspan && +style.tspan["font-size"] || 12;
        var rows = tbody.selectAll("text")
          .data(data.slice(1))  // Slice off labels.
          .enter()
          .append("text")
            .attr("x", 10 /*padding*/)
            .attr("y", (d, i) => {
              return topPadding + (i + 1) * dy - (dy - textSize) / 2;
            });

        // create a cell in each row for each column
        var cells = rows.selectAll("tspan")
          .data(function(row) {
            return columns.map(function(column) {
              let i = data[0].indexOf(column);  // Index of column.
              return {column: i, value: row[i]};
            });
          })
          .enter()
          .append("tspan")
            .attr("text-anchor", "end")
            .attr("x", (d, i) => {
               return width - 10; // right padding
            })
          .html(function(d) {
            let text = d.value;
            if (text.length > 34) {
              let words = text.split(" ");
              text = "";
              for (let i = 0; text.length < 36; i++) {
                if (i) {
                  text += " ";
                }
                text += words[i];
              }
              // Now slice off the last word.
              text = text.slice(0, text.lastIndexOf(" ")) + "\u2026";
            }
            return text;
          });
        return table;
      }
    },
    render () {
      return (
        <div id="chart"/>
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
      let style = props.style;
      let padding = props.chartPadding || 0;
      let width = props.width - 2 * padding || "100%";
      let height = props.height - 2 * padding || "100%";
      // render the table
      tabulate(data, ["Reward", "Count"]);
      if (style) {
        // Apply global styles.
        Object.keys(style).forEach(selector => {
          let styles = style[selector];
          Object.keys(styles).forEach(style => {
            d3.selectAll(selector).style(style, styles[style]);
          });
        });
      }
      d3.select("#graff-view").append("div").classed("done-rendering", true);
      // The table generation function
      function tabulate(data, columns) {
        var table = d3.select("#chart").append("svg"),
        tbody = table.append("g");
        table
          .attr("width", width + 2 * padding)
          .attr("height", height + 2 * padding);

        // create a row for each object in the data
        let count = data.length;
        let dy = height / count;
        let textSize = +style.tspan["font-size"] || 12;
        var rows = tbody.selectAll("text")
          .data(data)
          .enter()
          .append("text")
            .attr("x", padding)
            .attr("y", (d, i) => {
              return padding + (i + 1) * dy - (dy - textSize) / 2 - 2;
            });

        var lines = tbody.selectAll("line")
          .data(data.slice(1))
          .enter()
          .append("line")
            .attr("x1", padding)
            .attr("y1", (d, i) => {
              return padding + (i + 1) * dy;
            })
            .attr("x2", padding + 400)
            .attr("y2", (d, i) => {
              return padding + (i + 1) * dy;
            });
        // create a cell in each row for each column
        var cells = rows.selectAll("tspan")
          .data(function(row) {
            return columns.map(function(column, i) {
              return {column: i, value: row[i]};
            });
          })
          .enter()
          .append("tspan")
            .attr("text-anchor", (d, i) => {
               return d.column === 0 ? "start" : "end"
            })
            .attr("x", (d, i) => {
               return d.column === 0 ? padding : padding + width;
            })
          .html(function(d) {
            let text;
            if (!d.value) {
              text = String(d.value);
            } else if (d.value.length > 34) {
              let words = d.value.split(" ");
              text = "";
              for (let i = 0; text.length < 36; i++) {
                if (i) {
                  text += " ";
                }
                text += words[i];
              }
              // Now slice off the last word.
              text = text.slice(0, text.lastIndexOf(" ")) + "\u2026";
            } else {
              text = d.value;
            }
            return text;
          });
        return table;
      }
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
      let showXAxis = this.props.hideXAxis !== true;
      let showYAxis = this.props.hideYAxis !== true;
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
            show: showXAxis,
          },
          y: {
            show: showYAxis,
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
      let props = this.props;
      let cols = props.args.vals[0];
      let rows = props.args.vals;
      let vals = [];
      let colors = props.colors;
      let showXAxis = props.hideXAxis !== true;
      let showYAxis = props.hideYAxis !== true;
      let lineWidth = props.lineWidth;
      let dotRadius = props.dotRadius;
      let chartPadding = props.chartPadding;
      let [min, max] = getRange(rows.slice(1)); // Slice off labels.
      let pad = (max - min) / 4;
      rows = rebaseValues(pad - min, rows);  // val + pad - min
      let types = {}
      types[cols[cols.length - 1]] = "area";  // Use last column as values.
      let padding = {
        top: -5,
        right: -20,
        bottom: -7,
        left: -20,
      };
      if (chartPadding) {
        if (chartPadding instanceof Array) {
          padding = {
            top: padding.top + chartPadding[0],
            right: padding.right + chartPadding[1],
            bottom: padding.bottom + chartPadding[2],
            left: padding.left + chartPadding[3],
          }
        } // Otherwise, its undefine, scalar or object, which is fine.
      }
      var chart = c3.generate({
        bindto: "#chart",
        padding: padding,
        data: {
          rows: rows,
          types: types,
        },
        legend: {
          show: false,
        },
        axis: {
          x: {
            show: showXAxis,
            padding: {
              left: 1,
              right: 1,
            },
          },
          y: {
            show: showYAxis,
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
      d3.select("#graff-view").append("div").classed("done-rendering", true);
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
        <link rel="stylesheet" href="L104/style.css" />
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
