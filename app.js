/*

Family Wealth AI OS

V6.0.1 Stability Patch

Main Application

财富系统统一控制层

*/

import assetsAgent 

from "./agents/assetsAgent.js";

import incomeAgent 

from "./agents/incomeAgent.js";

import investmentAgent 

from "./agents/investmentAgent.js";

import liabilityAgent 

from "./agents/liabilityAgent.js";

import wealthEngine 

from "./agents/wealthEngine.js";

import cfoAgent 

from "./agents/cfoAgent.js";

import taxAgent 

from "./agents/taxAgent.js";

import retirementAgent 

from "./agents/retirementAgent.js";

// ======================

// 系统启动

// ======================

window.onload=function(){

    assetsAgent.init();

    incomeAgent.init();

    investmentAgent.init();

    liabilityAgent.init();

    if(taxAgent.init){

        taxAgent.init();

    }

    if(retirementAgent.init){

        retirementAgent.init();

    }

    cfoAgent.init();

    refreshAll();

};

// ======================

// 工具

// ======================

function getValue(id){

    let el =

    document.getElementById(id);

    return el

    ?

    el.value

    :

    "";

}

// ======================

// 总刷新

// ======================

function refreshAll(){

    updateDashboard();

    updateAssetDisplay();

    updateLiabilityDisplay();

    updateIncomeDisplay();

    updateInvestmentDisplay();

}

// ======================

// 财富驾驶舱

// ======================

function updateDashboard(){

    let wealth =

    wealthEngine.summary(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    );

    let cfo =

    cfoAgent.report(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    );

    let data={

        totalAssets:

        wealth.totalAssets,

        netWorth:

        wealth.netWorth,

        totalLiability:

        wealth.totalLiability,

        totalIncome:

        wealth.totalIncome,

        investmentReturn:

        wealth.investmentProfit,

        wealthScore:

        cfo.wealthScore

    };

    Object.keys(data)

    .forEach(id=>{

        let el =

        document.getElementById(id);

        if(el){

            if(id==="wealthScore"){

                el.innerHTML =

                data[id];

            }

            else{

                el.innerHTML =

                "¥"+

                Number(

                    data[id] || 0

                )

                .toLocaleString();

            }

        }

    });

}

// ======================

// 资产中心

// ======================

function addNewAsset(){

    let asset={

        name:

        getValue("assetName"),

        category:

        getValue("assetCategory"),

        value:

        Number(

            getValue("assetValue")

        )

    };

    if(!asset.name){

        alert(

            "请输入资产名称"

        );

        return;

    }

    assetsAgent.add(asset);

    refreshAll();

}

function updateAssetDisplay(){

    let box=

    document.getElementById(

        "assetList"

    );

    if(!box)return;

    box.innerHTML="";

    assetsAgent.view()

    .forEach(item=>{

        box.innerHTML +=`

        <div class="item">

        <h3>

        ${item.name}

        </h3>

        类别：

        ${item.category}

        <br>

        价值：

        ¥${Number(

            item.value

        ).toLocaleString()}

        <br><br>

        <button onclick="deleteAsset(${item.id})">

        删除

        </button>

        </div>

        `;

    });

}

function deleteAsset(id){

    assetsAgent.delete(id);

    refreshAll();

}
// ======================

// 负债中心

// ======================

function addNewLiability(){

    let liability={

        name:

        getValue("liabilityName"),

        category:

        getValue("liabilityCategory"),

        principal:

        Number(

            getValue("liabilityPrincipal")

        ),

        interest:

        Number(

            getValue("liabilityInterest")

        )

    };

    if(!liability.name){

        alert(

            "请输入负债名称"

        );

        return;

    }

    liabilityAgent.add(liability);

    refreshAll();

}

function updateLiabilityDisplay(){

    let box=

    document.getElementById(

        "liabilityList"

    );

    if(!box)return;

    box.innerHTML="";

    liabilityAgent.view()

    .forEach(item=>{

        box.innerHTML +=`

        <div class="item">

        <h3>

        ${item.name}

        </h3>

        类别：

        ${item.category}

        <br>

        本金：

        ¥${Number(

            item.principal

        ).toLocaleString()}

        <br><br>

        <button onclick="deleteLiability(${item.id})">

        删除

        </button>

        </div>

        `;

    });

}

function deleteLiability(id){

    liabilityAgent.delete(id);

    refreshAll();

}

// ======================

// 收入中心

// ======================

function addIncome(){

    let income={

        name:

        getValue("incomeName"),

        amount:

        Number(

            getValue("incomeAmount")

        )

    };

    if(!income.name){

        alert(

            "请输入收入名称"

        );

        return;

    }

    incomeAgent.add(income);

    refreshAll();

}

function updateIncomeDisplay(){

    let box=

    document.getElementById(

        "incomeList"

    );

    if(!box)return;

    box.innerHTML="";

    incomeAgent.view()

    .forEach(item=>{

        box.innerHTML +=`

        <div class="item">

        <h3>

        ${item.name}

        </h3>

        金额：

        ¥${Number(

            item.amount

        ).toLocaleString()}

        </div>

        `;

    });

}

// ======================

// 投资中心

// ======================

function addInvestment(){

    let investment={

        name:

        getValue("investmentName"),

        ticker:

        getValue("investmentTicker"),

        buyPrice:

        Number(

            getValue("investmentBuyPrice")

        ),

        buyQuantity:

        Number(

            getValue("investmentBuyQuantity")

        ),

        currentPrice:

        Number(

            getValue("investmentCurrentPrice")

        )

    };

    if(!investment.name){

        alert(

            "请输入投资名称"

        );

        return;

    }

    investmentAgent.add(investment);

    refreshAll();

}

function updateInvestmentDisplay(){

    let box=

    document.getElementById(

        "investmentList"

    );

    if(!box)return;

    box.innerHTML="";

    investmentAgent.inventory()

    .forEach(item=>{

        box.innerHTML +=`

        <div class="item">

        <h3>

        ${item.name}

        </h3>

        ${item.ticker || ""}

        <br>

        数量：

        ${item.buyQuantity || 0}

        <br>

        市值：

        ¥${Number(

            item.marketValue || 0

        ).toLocaleString()}

        <br>

        收益：

        ¥${Number(

            item.totalProfit || 0

        ).toLocaleString()}

        </div>

        `;

    });

}

// ======================

// AI CFO

// ======================

function generateCFOReport(){

    let report =

    cfoAgent.report(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    );

    let box=

    document.getElementById(

        "cfoReport"

    );

    if(!box)return;

    box.innerHTML=`

    <div class="item">

    <h3>

    ${report.title}

    </h3>

    净资产：

    ¥${Number(

        report.netWorth || 0

    ).toLocaleString()}

    <br>

    财富评分：

    ${report.wealthScore}

    <h4>

    AI建议

    </h4>

    <ul>

    ${report.advice

    .map(

        x=>

        `<li>${x}</li>`

    )

    .join("")}

    </ul>

    </div>

    `;

}

// ======================

// 暴露给 HTML

// ======================

window.addNewAsset =

addNewAsset;

window.deleteAsset =

deleteAsset;

window.addNewLiability =

addNewLiability;

window.deleteLiability =

deleteLiability;

window.addIncome =

addIncome;

window.addInvestment =

addInvestment;

window.generateCFOReport =

generateCFOReport;
