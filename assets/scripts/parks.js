"use strict";
let c = [];
let i = [];
let d = [];
window.onload = function () {
  const e = document.getElementById("typeSelectionDiv");
  u(e, true);
  const t = document.getElementById("parkLocationsDDL");
  t.disabled = true;
  $.getJSON("assets/data/locations.json", function (e) {
    c = e;
    $.getJSON("assets/data/parktypes.json", function (e) {
      i = e;
      $.getJSON("assets/data/nationalparks.json", function (e) {
        d = e.parks;
        h(c);
        E(i);
        t.disabled = false;
      });
    });
  });
  const n = document.getElementById("searchLocationRadio");
  const a = document.getElementById("searchTypeRadio");
  const o = document.getElementById("viewAllRadio");
  n.onchange = function () {
    m(this);
  };
  a.onchange = function () {
    m(this);
  };
  o.onchange = function () {
    m(this);
  };
  t.onchange = s;
  const l = document.getElementById("parkTypesDDL");
  l.onchange = r;
};
function r() {
  const e = document.getElementById("parkTypesDDL");
  l();
  let n = e.value.toUpperCase();
  if (!n) {
    return;
  }
  let t = d.filter((e) => {
    let t = e.LocationName.toUpperCase();
    if (t.includes(n)) {
      return true;
    }
    return false;
  });
  if (t.length === 0) {
    a("Sorry, no matching parks found.", "text-danger");
    return;
  }
  p(t);
}
function s() {
  const e = document.getElementById("parkLocationsDDL");
  l();
  let t = e.value.toUpperCase();
  if (!t) {
    return;
  }
  let n = d.filter((e) => e.State.toUpperCase() === t);
  if (n.length === 0) {
    a("Sorry, no matching parks found.", "text-danger");
    return;
  }
  p(n);
}
function m(e) {
  const t = document.getElementById("typeSelectionDiv");
  const n = document.getElementById("locationSelectionDiv");
  const a = document.getElementById("parkLocationsDDL");
  const o = document.getElementById("parkTypesDDL");
  l();
  switch (e.id) {
    case "searchLocationRadio":
      u(t, true);
      u(n, false);
      a.selectedIndex = 0;
      break;
    case "searchTypeRadio":
      u(t, false);
      u(n, true);
      o.selectedIndex = 0;
      break;
    default:
      u(t, true);
      u(n, true);
      p(d);
      break;
  }
}
function a(e, t = "text-black") {
  const n = document.getElementById("parkOutputDiv");
  let a = document.createElement("p");
  a.className = t;
  a.innerHTML = e;
  n.appendChild(a);
}
function o(t) {
  let e = document.createElement("div");
  e.className = "card p-2 m-1";
  let n = document.createElement("h5");
  n.className = "card-title";
  if (t.Visit === undefined) {
    n.innerHTML = t.LocationName;
  } else {
    let e = L(t.LocationName, t.Visit);
    n.appendChild(e);
  }
  let a = document.createElement("div");
  a.className = "row";
  let o = document.createElement("div");
  let l = document.createElement("div");
  o.className = "col";
  l.className = "col";
  o.innerHTML = "Phone";
  l.innerHTML = "Fax";
  a.appendChild(o);
  a.appendChild(l);
  let c = document.createElement("div");
  c.className = "row pb-2";
  let i = document.createElement("div");
  let d = document.createElement("div");
  i.className = "col";
  d.className = "col";
  i.innerHTML = t.Phone;
  d.innerHTML = t.Fax;
  if (t.Phone === 0) {
    i.innerHTML = "N/A";
  }
  if (t.Fax === 0) {
    d.innerHTML = "N/A";
  }
  c.appendChild(i);
  c.appendChild(d);
  let r = document.createElement("div");
  r.className = "pb-2";
  r.innerHTML = f(t.Address, t.City, t.State, t.ZipCode);
  let s = document.createElement("div");
  s.className = "row mt-auto";
  let m = document.createElement("div");
  m.className = "col";
  let p = document.createElement("div");
  p.className = "col";
  let u = g(t.Latitude, t.Longitude);
  p.appendChild(u);
  let h = document.createElement("div");
  h.className = "col text-right mt-auto pr-3";
  h.innerHTML = "ID: " + t.LocationID;
  s.appendChild(m);
  s.appendChild(p);
  s.appendChild(h);
  e.appendChild(n);
  e.appendChild(r);
  e.appendChild(a);
  e.appendChild(c);
  e.appendChild(s);
  return e;
}
function f(e, t, n, a) {
  let o = a.toString();
  let l = o;
  if (o === "0") {
    l = "";
  } else if (o.length < 5) {
    l = o.padStart(5, "0");
  }
  if (t === 0) {
    t = "";
  }
  if (n === 0) {
    n = "";
  }
  if (e === 0) {
    let e = `${t}, ${n} ${l}`;
    return e;
  }
  let c = e.split(",");
  let i = c[0].trim();
  let d = c.length;
  for (let e = 1; e < d; e++) {
    i = i + "<br>" + c[e];
  }
  let r = `${i}<br>${t}, ${n} ${l}`;
  return r;
}
function l() {
  const e = document.getElementById("parkOutputDiv");
  e.innerHTML = "";
}
function p(e) {
  const n = document.getElementById("parkOutputDiv");
  e.forEach((e) => {
    let t = o(e);
    n.appendChild(t);
  });
}
function g(e, t) {
  const n = "https://www.google.com/maps/place/";
  let a = document.createElement("a");
  a.href = n + e + "," + t;
  a.target = "_blank";
  a.innerHTML = "Map";
  a.className = "btn btn-primary";
  return a;
}
function L(e, t) {
  let n = document.createElement("a");
  n.href = t;
  n.target = "_blank";
  n.innerHTML = e;
  return n;
}
function u(e, t = true) {
  if (t) {
    e.classList.add("d-none");
    return;
  }
  e.classList.remove("d-none");
}
function h(n) {
  const a = document.getElementById("parkLocationsDDL");
  let e = new Option("Choose One...", "");
  a.appendChild(e);
  let o = n.length;
  for (let t = 0; t < o; t++) {
    let e = new Option(n[t]);
    a.appendChild(e);
  }
}
function E(n) {
  const a = document.getElementById("parkTypesDDL");
  let e = new Option("Choose One...", "");
  a.appendChild(e);
  let o = n.length;
  for (let t = 0; t < o; t++) {
    let e = new Option(n[t]);
    a.appendChild(e);
  }
}
