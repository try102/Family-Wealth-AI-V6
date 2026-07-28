/*

Family Wealth AI OS

V6.0.2 Stability Patch

Main Application

统一控制层

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

    taxAgent.init();

    retirementAgent.init();

    cfoAgent.init();

    refreshAll();

};

// ======================

// 工具函数

// ======================

function getValue(id){

    let el=

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

    updateIncomeDisplay();

    updateInvestmentDisplay();

    updateLiabilityDisplay();

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

        let el=

        document.getElementById(id);

        if(el){

            if(id==="wealthScore"){

                el.innerHTML=data[id];

            }

            else{

                el.innerHTML=

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

        type:

        getValue("assetType"),

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

        ${item.category || "其他"}

        <br>

        价值：

        ¥${Number(

            item.value || 0

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

    if(confirm("删除资产？")){

        assetsAgent.delete(id);

        refreshAll();

    }

}
// ======================

// 收入中心

// ======================

function addIncome(){

    let income={

        name:

        getValue("incomeName"),

        category:

        getValue("incomeCategory"),

        source:

        getValue("incomeSource"),

        amount:

        Number(

            getValue("incomeAmount")

        ),

        period:

        getValue("incomePeriod")

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

        类别：

        ${item.category || ""}

        <br>

        金额：

        ¥${Number(

            item.amount || 0

        ).toLocaleString()}

        <br>

        来源：

        ${item.source || ""}

        <br><br>

        <button onclick="editIncome(${item.id})">

        编辑

        </button>

        <button onclick="deleteIncome(${item.id})">

        删除

        </button>

        </div>

        `;

    });

}

function editIncome(id){

    let item=

    incomeAgent.view()

    .find(

        x=>x.id===id

    );

    if(!item)return;

    let amount=

    prompt(

        "修改收入金额",

        item.amount

    );

    if(amount!==null){

        incomeAgent.edit(

            id,

            {

                amount:

                Number(amount)

            }

        );

        refreshAll();

    }

}

function deleteIncome(id){

    if(confirm("删除收入记录？")){

        incomeAgent.delete(id);

        refreshAll();

    }

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

        type:

        getValue("investmentType"),

        market:

        getValue("investmentMarket"),

        currency:

        getValue("investmentCurrency"),

        buyDate:

        getValue("investmentBuyDate"),

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

        ),

        note:

        getValue("investmentNote")

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

        代码：

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

        <br><br>

        <button onclick="editInvestment(${item.id})">

        编辑

        </button>

        <button onclick="deleteInvestment(${item.id})">

        删除

        </button>

        </div>

        `;

    });

}

function editInvestment(id){

    let item=

    investmentAgent.view()

    .find(

        x=>x.id===id

    );

    if(!item)return;

    let price=

    prompt(

        "修改当前价格",

        item.currentPrice

    );

    if(price!==null){

        investmentAgent.edit(

            id,

            {

                currentPrice:

                Number(price)

            }

        );

        refreshAll();

    }

}

function deleteInvestment(id){

    if(confirm("删除投资记录？")){

        investmentAgent.delete(id);

        refreshAll();

    }

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

    总资产：

    ¥${Number(

        report.totalAssets || 0

    ).toLocaleString()}

    <br>

    总负债：

    ¥${Number(

        report.totalLiability || 0

    ).toLocaleString()}

    <br>

    净资产：

    ¥${Number(

        report.netWorth || 0

    ).toLocaleString()}

    <br>

    年度收入：

    ¥${Number(

        report.totalIncome || 0

    ).toLocaleString()}

    <br>

    投资收益：

    ¥${Number(

        report.investmentProfit || 0

    ).toLocaleString()}

    <br><br>

    财富评分：

    ${report.wealthScore}

    <h4>

    AI建议

    </h4>

    <ul>

    ${

        report.advice

        ?

        report.advice

        .map(

            x=>

            `<li>${x}</li>`

        )

        .join("")

        :

        ""

    }

    </ul>

    </div>

    `;

}

// ======================

// 税务中心预留

// ======================

function generateTaxReport(){

    let box=

    document.getElementById(

        "taxReport"

    );

    if(box){

        box.innerHTML=

        "税务模块 V6.1 接入";

    }

}

// ======================

// 退休中心预留

// ======================

function generateRetirementReport(){

    let box=

    document.getElementById(

        "retirementReport"

    );

    if(box){

        box.innerHTML=

        "退休规划模块 V6.1 接入";

    }

}

// ======================

// 暴露函数

// ======================

window.addNewAsset=

addNewAsset;

window.deleteAsset=

deleteAsset;

window.addIncome=

addIncome;

window.editIncome=

editIncome;

window.deleteIncome=

deleteIncome;

window.addInvestment=

addInvestment;

window.editInvestment=

editInvestment;

window.deleteInvestment=

deleteInvestment;

window.generateCFOReport=

generateCFOReport;

window.generateTaxReport=

generateTaxReport;

window.generateRetirementReport=

generateRetirementReport;
