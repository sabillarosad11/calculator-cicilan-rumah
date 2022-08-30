import React, {useState, useEffect, useMemo} from "react";

const TheLeafMansion = () => {
  const types = useMemo(() => [{
      id: "1",
      name: "27/60"
    },
    {
      id: "2",
      name: "33/72"
    },
    {
      id: "3",
      name: "45/98"
    },
  ], []);

  

  const payments = useMemo(() => [{
      id: "1",
      name: "Kas Keras"
    },
    {
      id: "2",
      name: "HHIT"
    },
    {
      id: "3",
      name: "BRI"
    },
  ], []);

  const instalment = [
    {id:"1", paymentsId:"1", name:"1 Tahun", value:1},
    {id:"2", paymentsId:"2", name:"5 Tahun", value:5},
    {id:"3", paymentsId:"3", name:"5 Tahun", value:5},
    {id:"4", paymentsId:"3", name:"10 Tahun", value:10},
    {id:"5", paymentsId:"3", name:"15 Tahun", value:15},
    {id:"6", paymentsId:"3", name:"20 Tahun", value:20},
  ]

  const [type, setType] = useState([]);
  const [hargaJual, setHargaJual] = useState();
  const [payment, setPayment] = useState([]);
  const [pilihCicilan, setPilihCicilan] = useState([]);
  const [hargaBeli, setHargaBeli] = useState();
  const [textCicilan, setTextCicilan] = useState();
  const [dp, setDp] = useState();
  const [cicilDp, setCicilDp] = useState();
  const [bunga, setBunga] = useState();
  const [tc, setTc] = useState();
  const [lamaCicilan, setLamaCicilan] = useState();
  const [cicilan, setCicilan] = useState();

  const handleUnit = (e) => {
    e.target.value === "27/60" ? setHargaJual(220000000) : e.target.value === "33/72" ? setHargaJual(285000000) : e.target.value === "45/98" ? setHargaJual(350000000) : setHargaJual("No Price")
  };

  const handleCicilan = (id) => {
    const dc = instalment.filter(x => x.paymentsId === id)
    setPilihCicilan(dc)
    setHargaBeli(id === "1" ? hargaJual / (1 + (6 / 100)) : id === "2" ? hargaJual / (1 + (6 / 100)) : id === "3" ? hargaJual / 1 : 0);
    setTextCicilan(id === "1"?"Kas Keras": id === "2"?"HHIT": id === "3"?"BRI": "");
    setDp(id === "1" ? 5 / 100 : id === "2" ? 33.333333333 / 100 : 0);
    setCicilDp(id === "1" ? 3 : id === "2" ? 1 : id === "3" ? 6 : 0);
    setBunga(id === "1" ? 0 : id === "2" ? 6/100 : id === "3" ? 8.75/100 : 0);
    setTc(id === "1" ? "Dicicil 1 Tahun" : id === "2" ? "Max 5 Tahun" : id === "3" ? "5 Tahun Fix Interest, setelah itu float" : "");
  }

  const handleLamaCicilan = (e) => {
    setLamaCicilan(e.target.value)
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d* )(?=(\d{3})+(?!\d))/g, ",");
  }

  function handleNan(x) {
    if (isNaN(x) || x === Infinity) {
      return 0;
    }
    return x;
  }
  useEffect(() => {
    setType(types);
    setPayment(payments);

    let r = (bunga * 100) / 12;
    let plafonCicilan = Math.round(hargaBeli - dp * hargaBeli);
    let n = lamaCicilan * 12
    // console.log('lamaCicilan',lamaCicilan)
    // console.log('plafonCicilan', plafonCicilan)
    // console.log('r', r)
    // console.log('n', n)
    r === 0 ?
      setCicilan(plafonCicilan / n) :
      setCicilan(plafonCicilan * (((r / 100) * (1 + (r / 100))) ^ n) / ((1 + (r / 100)) ^ (n - 1)));
  },[payments, types, lamaCicilan, bunga, dp, hargaBeli])
  return (
    <div className="container-md p-5">
      <div className="mb-4">
        <h1>Kalkulator Cicilan</h1>
        <span className="mb-4 text-simulasi">
          Simulasikan cicilan sewa dan cicilan KPR dengan mudah disini
        </span>
      </div>
      <div className="row row-mb">
        <div className="col-md-6">
          <div className="input-group row">
            <label for="inputPassword" className="col-sm-4 col-form-label">
              Tipe Rumah
            </label>
            <div className="col-sm-8">
              <select class="form-select" aria-label="Default select example" onChange={handleUnit}>
                <option selected>Pilih Tipe Unit</option>
                {
                  type && type !== undefined ?
                  type.map((t, index) => {
                    return (
                      <option key={index} value={t.name}>{t.name}</option>
                    )
                  }) : "No Type"
                }
              </select>
            </div>
          </div>
          <div className="input-group row">
            <label for="inputPassword" className="col-sm-4 col-form-label">
              Harga Penjualan
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control grey"
                id="inputPassword"
                value={hargaJual ? `Rp ${numberWithCommas(Math.round(hargaJual))}` : 0}
                disabled
              />
            </div>
          </div>
          <div className="input-group row">
            <label for="inputPassword" className="col-sm-4 col-form-label">
              Tipe Pembayaran
            </label>
            <div className="col-sm-8">
              <select class="form-select" aria-label="Default select example" onChange={(e) => handleCicilan(e.target.value)}>
                <option selected>Pilih Opsi Cicilan</option>
                {
                  payment && payment !== undefined ?
                  payment.map((p, index) => {
                    return(
                      <option key={index} value={p.id}>{p.name}</option>
                    )
                  }) : "No Payment"
                }
              </select>
            </div>
          </div>
          <div className="input-group row">
            <label for="inputPassword" className="col-sm-4 col-form-label">
              Harga Pembelian
            </label>
            <div className="col-sm-8">
              <div className="row">
                <div className="col-sm-7">
                  <input
                    type="text"
                    className="form-control grey"
                    id="inputPassword"
                    value = {
                      hargaBeli ? `Rp ${numberWithCommas(Math.round(hargaBeli))}` : 0
                    }
                    disabled
                  />
                </div>
                <div className="col-sm-4">
                  <label
                    for="inputPassword"
                    className="col-form-label label-diskon"
                  >
                    <span className="me-1 text-diskon">Diskon</span>
                    <span className="text-value-diskon">{hargaBeli !== 0 && hargaJual > hargaBeli ? (((hargaJual-hargaBeli)/hargaJual)*100).toFixed(2):0}%</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="input-group row">
            <label for="inputPassword" className="col-sm-4 col-form-label">
              Lama Cicilan
            </label>
            <div className="col-sm-8">
              <select class="form-select" aria-label="Default select example" onChange={handleLamaCicilan}>
                <option value={0}>
                  Pilih Periode Cicilan
                </option>
                {
                  pilihCicilan && pilihCicilan !== undefined ? 
                  pilihCicilan.map((l, index) => {
                    return(
                      <option key={index} value={l.value}>{l.name}</option>
                    )
                  }) : "No Data"
                }
              </select>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card card-detail card-cicilan">
            <div className="mt-4 text-wrapper d-flex justify-content-between">
              <p>Cicilan {textCicilan}</p>
              <p>Total DP</p>
            </div>
            <div className="mt-2 mb-2 text-wrapper d-flex justify-content-between">
              <div className="d-flex align-items-end">
                <span className="text-rp">Rp</span>
                <span className="text-price">
                  {
                    numberWithCommas(Math.round(handleNan(cicilan)))
                  }
                </span>
              </div>
              <div className="d-flex align-items-end">
                <span className="text-rp">Rp</span>
                <span className="text-price">
                  {
                    numberWithCommas(Math.round(handleNan(dp * hargaBeli)))
                  }
                </span>
              </div>
            </div>
            <hr />
            <div className="text-wrapper d-flex justify-content-between">
              <p>Lama Cicilan DP</p>
              <p className="text-bold">{cicilDp} Tahun</p>
            </div>
            <hr />
            <div className="text-wrapper d-flex justify-content-between">
              <p>Cicilan DP</p>
              <div className="d-flex">
                <p className="text-bold">
                  Rp {
                    numberWithCommas(Math.round(handleNan(((dp * hargaBeli) / cicilDp) / 12)))
                  }
                </p>
                <p> /bulan</p>
              </div>
            </div>
            <hr />
            <div className="text-wrapper d-flex justify-content-between">
              <p>Plafon Cicilan</p>
              <p className="text-bold">
                Rp {
                  numberWithCommas(Math.round(handleNan(hargaBeli - (dp * hargaBeli))))
                }
              </p>
            </div>
            <hr />
            <div className="text-wrapper d-flex justify-content-between">
              <p>Bunga Cicilan</p>
              <p className="text-bold">{handleNan(bunga * 100)}%</p>
            </div>
            <hr />
            <div className="text-wrapper d-flex">
              <p className="text-bold">Keterangan:</p>
              <p className="ms-1">{tc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheLeafMansion;
