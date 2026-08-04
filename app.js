/*

 

Family Wealth AI OS

V7.0 Final Build

Main Application

Final Integration

*/

import assetsAgent from "./agents/assetsAgent.js";

import incomeAgent from "./agents/incomeAgent.js";

import investmentAgent from "./agents/investmentAgent.js";

import liabilityAgent from "./agents/liabilityAgent.js";

import wealthEngine from "./agents/wealthEngine.js";

import cfoAgent from "./agents/cfoAgent.js";

import taxAgent from "./agents/taxAgent.js";

import retirementAgent from "./agents/retirementAgent.js";

import advisor from "./ai/advisor.js";

// ======================

// 系统启动

// ======================

function startSystem(){

    assetsAgent.init();

    incomeAgent.init();

    investmentAgent.init();

    liabilityAgent.init();

    if(

        taxAgent.init

    ){

        taxAgent.init();

    }

    if(

        retirementAgent.init

    ){

        retirementAgent.init();

    }

    if(

        cfoAgent.init

    ){

        cfoAgent.init();

    }

    if(

        advisor.init

    ){

        advisor.init();

    }

    refreshAll();

}

// ======================

// 工具

// ======================

function getValue(id){

    let el =

    document.getElementById(id);

    if(!el){

        return "";

    }

    return el.value.trim();

}

// ======================

// 总刷新

// ======================

function refreshAll(){

    updateDashboard();

    updateAllocationDisplay();

    updateFinancialHealthDisplay();

    updateAssetDisplay();

    updateIncomeDisplay();

    updateInvestmentDisplay();

    updateLiabilityDisplay();

}

// ======================

// 页面启动

// ======================

if(

document.readyState==="loading"

){

    document.addEventListener(

        "DOMContentLoaded",

        startSystem

    );

}

else{

    startSystem();

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

    let report =

    cfoAgent.report(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    );

    let data={

        totalAssets:

        wealth.totalAssets || 0,

        netWorth:

        wealth.netWorth || 0,

        totalLiability:

        wealth.totalLiability || 0,

        totalIncome:

        wealth.totalIncome || 0,

        investmentReturn:

        wealth.investmentProfit || 0,

        wealthScore:

        report.wealthScore || 0

    };

    Object.keys(data)

    .forEach(id=>{

        let el =

        document.getElementById(id);

        if(el){

            if(

                id==="wealthScore"

            ){

                el.innerHTML=data[id];

            }

            else{

                el.innerHTML=

                "¥"+

                Number(data[id])

                .toLocaleString(

                    "zh-CN"

                );

            }

        }

    });

}

// ======================

// 资产配置分析

// ======================

function updateAllocationDisplay(){

    let box =

    document.getElementById(

        "allocationAnalysis"

    );

    if(!box){

        return;

    }

    let analysis =

    wealthEngine.allocationAnalysis(

        assetsAgent,

        investmentAgent

    );

    if(!analysis){

        box.innerHTML=

        "暂无数据";

        return;

    }

    let html="";

    Object.keys(

        analysis.ratio || {}

    )

    .forEach(key=>{

        html +=

        key+

        "："+

        analysis.ratio[key]+

        "%<br>";

    });

    if(

        analysis.risk

    ){

        html +=

        "<br>风险提示：<br>";

        analysis.risk

        .forEach(item=>{

            html +=

            "• "+

            item+

            "<br>";

        });

    }

    box.innerHTML=html;

}

// ======================

// 财务健康

// ======================

function updateFinancialHealthDisplay(){

    let box =

    document.getElementById(

        "financialHealth"

    );

    if(!box){

        return;

    }

    let data =

    wealthEngine.financialHealth(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    );

    box.innerHTML=

    `

    负债率：

    ${data.debtRatio}%

    <br>

    流动资产比例：

    ${data.liquidityRatio}%

    <br>

    投资资产比例：

    ${data.investmentRatio}%

    <br>

    房地产集中度：

    ${data.realEstateRatio}%

    <br>

    年度现金流：

    ¥${Number(

        data.annualCashFlow || 0

    )

    .toLocaleString("zh-CN")}

    `;

}
// ======================

// AI Advisor

// ======================

function generateAdvisorReport(){

    let report =

    advisor.report(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    );

    let box =

    document.getElementById(

        "advisorReport"

    );

    if(!box){

        return;

    }

    box.innerHTML =

    `

    <h3>

    🤖 家庭财富 AI 顾问

    </h3>

    财富评分：

    ${report.score || 0}

    <br><br>

    财富总结：

    <ul>

    ${

        report.summary

        .map(

            x=>

            "<li>"+x+"</li>"

        )

        .join("")

    }

    </ul>

    优势：

    <ul>

    ${

        report.strengths

        .map(

            x=>

            "<li>"+x+"</li>"

        )

        .join("")

    }

    </ul>

    风险：

    <ul>

    ${

        report.risks

        .map(

            x=>

            "<li>"+x+"</li>"

        )

        .join("")

    }

    </ul>

    行动建议：

    <ul>

    ${

        report.actions

        .map(

            x=>

            "<li>"+x+"</li>"

        )

        .join("")

    }

    </ul>

    `;

}

// ======================

// 税务中心

// ======================

function generateTaxReport(){

    let box =

    document.getElementById(

        "taxCenter"

    );

    if(!box){

        return;

    }

    let report =

    taxAgent.report(

        incomeAgent,

        investmentAgent

    );

    box.innerHTML =

    `

    <h3>

    🧾 税务分析

    </h3>

    总收入：

    ¥${Number(

        report.totalIncome || 0

    )

    .toLocaleString("zh-CN")}

    <br>

    投资收益：

    ¥${Number(

        report.investmentProfit || 0

    )

    .toLocaleString("zh-CN")}

    <br><br>

    税务提示：

    <ul>

    ${

        report.risks

        .map(

            x=>

            "<li>"+x+"</li>"

        )

        .join("")

    }

    </ul>

    建议：

    <ul>

    ${

        report.advice

        .map(

            x=>

            "<li>"+x+"</li>"

        )

        .join("")

    }

    </ul>

    `;

}

// ======================

// 退休中心

// ======================

function generateRetirementReport(){

    let box =

    document.getElementById(

        "retirementCenter"

    );

    if(!box){

        return;

    }

    let report =

    retirementAgent.report(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent,

        {

            currentAge:58,

            retireAge:65,

            returnRate:5

        }

    );

    box.innerHTML =

    `

    <h3>

    🏖 退休规划分析

    </h3>

    当前年龄：

    ${report.currentAge}

    <br>

    退休年龄：

    ${report.retirementAge}

    <br>

    距离退休：

    ${report.yearsToRetirement}

    年

    <br><br>

    当前资产：

    ¥${Number(

        report.currentAssets

    )

    .toLocaleString("zh-CN")}

    <br>

    预计退休资产：

    ¥${Number(

        report.projectedAssets

    )

    .toLocaleString("zh-CN")}

    <br><br>

    状态：

    ${report.status}

    <br><br>

    建议：

    <ul>

    ${

        report.advice

        .map(

            x=>

            "<li>"+x+"</li>"

        )

        .join("")

    }

    </ul>

    `;

}
// ======================

// 资产中心

// ======================

function addNewAsset(){

    let asset={

        name:getValue("assetName"),

        category:getValue("assetCategory"),

        type:getValue("assetType"),

        owner:getValue("assetOwner"),

        country:getValue("assetCountry"),

        currency:getValue("assetCurrency"),

        institution:getValue("assetInstitution"),

        account:getValue("assetAccount"),

        value:Number(

            getValue("assetValue")

        )

    };

    if(!asset.name){

        alert("请输入资产名称");

        return;

    }

    assetsAgent.add(asset);

    refreshAll();

}

function updateAssetDisplay(){

    let box =

    document.getElementById(

        "assetList"

    );

    if(!box){

        return;

    }

    box.innerHTML="";

    assetsAgent.view()

    .forEach(item=>{

        box.innerHTML +=

        `

        <div class="item">

        <h3>${item.name}</h3>

        类别：

        ${item.category || "其他"}

        <br>

        类型：

        ${item.type || ""}

        <br>

        价值：

        ¥${Number(

            item.value || 0

        )

        .toLocaleString("zh-CN")}

        <br><br>

        <button onclick="editAsset(${item.id})">

        编辑

        </button>

        <button onclick="deleteAsset(${item.id})">

        删除

        </button>

        </div>

        `;

    });

}

function editAsset(id){

    let item =

    assetsAgent.view()

    .find(

        x=>x.id===id

    );

    if(!item){

        return;

    }

    let value =

    prompt(

        "修改资产价值",

        item.value

    );

    if(value!==null){

        assetsAgent.edit(

            id,

            {

                value:Number(value)

            }

        );

        refreshAll();

    }

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

        name:getValue("incomeName"),

        category:getValue("incomeCategory"),

        source:getValue("incomeSource"),

        amount:Number(

            getValue("incomeAmount")

        )

    };

    if(!income.name){

        alert("请输入收入名称");

        return;

    }

    incomeAgent.add(income);

    refreshAll();

}

function updateIncomeDisplay(){

    let box =

    document.getElementById(

        "incomeList"

    );

    if(!box){

        return;

    }

    box.innerHTML="";

    incomeAgent.view()

    .forEach(item=>{

        box.innerHTML +=

        `

        <div class="item">

        <h3>

        ${item.name}

        </h3>

        类别：

        ${item.category || "其他"}

        <br>

        金额：

        ¥${Number(

            item.amount || 0

        )

        .toLocaleString("zh-CN")}

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

    let item =

    incomeAgent.view()

    .find(

        x=>x.id===id

    );

    if(!item){

        return;

    }

    let amount =

    prompt(

        "修改收入金额",

        item.amount

    );

    if(amount!==null){

        incomeAgent.edit(

            id,

            {

                amount:Number(amount)

            }

        );

        refreshAll();

    }

}

function deleteIncome(id){

    if(confirm("删除收入？")){

        incomeAgent.delete(id);

        refreshAll();

    }

}

// ======================

// 投资中心

// ======================

function addInvestment(){

    let investment={

        name:getValue("investmentName"),

        ticker:getValue("investmentTicker"),

        type:getValue("investmentType"),

        buyDate:getValue("investmentBuyDate"),

        buyPrice:Number(

            getValue("investmentBuyPrice")

        ),

        buyQuantity:Number(

            getValue("investmentBuyQuantity")

        ),

        sellDate:getValue("investmentSellDate"),

        sellPrice:Number(

            getValue("investmentSellPrice")

        ),

        sellQuantity:Number(

            getValue("investmentSellQuantity")

        ),

        currentPrice:Number(

            getValue("investmentCurrentPrice")

        )

    };

    if(!investment.name){

        alert("请输入投资名称");

        return;

    }

    investmentAgent.add(

        investment

    );

    refreshAll();

}
// ======================

// 投资显示

// ======================

function updateInvestmentDisplay(){

    let box =

    document.getElementById(

        "investmentList"

    );

    if(!box){

        return;

    }

    box.innerHTML="";

    investmentAgent.inventory()

    .forEach(item=>{

        box.innerHTML +=

        `

        <div class="item">

        <h3>

        ${item.name}

        </h3>

        代码：

        ${item.ticker || ""}

        <br>

        买入价格：

        ¥${Number(

            item.buyPrice || 0

        ).toLocaleString("zh-CN")}

        <br>

        数量：

        ${item.buyQuantity || 0}

        <br>

        当前价格：

        ¥${Number(

            item.currentPrice || 0

        ).toLocaleString("zh-CN")}

        <br>

        当前市值：

        ¥${Number(

            item.marketValue || 0

        ).toLocaleString("zh-CN")}

        <br>

        收益：

        ¥${Number(

            item.totalProfit || 0

        ).toLocaleString("zh-CN")}

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

    let item =

    investmentAgent.inventory()

    .find(

        x=>x.id===id

    );

    if(!item){

        return;

    }

    let price =

    prompt(

        "修改当前价格",

        item.currentPrice

    );

    if(price!==null){

        investmentAgent.edit(

            id,

            {

                currentPrice:Number(price)

            }

        );

        refreshAll();

    }

}

function deleteInvestment(id){

    if(confirm("删除投资？")){

        investmentAgent.delete(id);

        refreshAll();

    }

}

// ======================

// 负债中心

// ======================

function addNewLiability(){

    let liability={

        name:getValue("liabilityName"),

        category:getValue("liabilityCategory"),

        principal:Number(

            getValue("liabilityPrincipal")

        ),

        interest:Number(

            getValue("liabilityInterest")

        ),

        period:getValue("liabilityPeriod"),

        owner:getValue("liabilityOwner"),

        currency:getValue("liabilityCurrency")

    };

    if(!liability.name){

        alert("请输入负债名称");

        return;

    }

    liabilityAgent.add(

        liability

    );

    refreshAll();

}

function updateLiabilityDisplay(){

    let box =

    document.getElementById(

        "liabilityList"

    );

    if(!box){

        return;

    }

    box.innerHTML="";

    liabilityAgent.view()

    .forEach(item=>{

        box.innerHTML +=

        `

        <div class="item">

        <h3>

        ${item.name}

        </h3>

        本金：

        ¥${Number(

            item.principal || 0

        ).toLocaleString("zh-CN")}

        <br>

        利率：

        ${item.interest || 0}%

        <br>

        周期：

        ${item.period || ""}

        <br><br>

        <button onclick="editLiability(${item.id})">

        编辑

        </button>

        <button onclick="deleteLiability(${item.id})">

        删除

        </button>

        </div>

        `;

    });

}

function editLiability(id){

    let item =

    liabilityAgent.view()

    .find(

        x=>x.id===id

    );

    if(!item){

        return;

    }

    let amount =

    prompt(

        "修改负债本金",

        item.principal

    );

    if(amount!==null){

        liabilityAgent.edit(

            id,

            {

                principal:Number(amount)

            }

        );

        refreshAll();

    }

}

function deleteLiability(id){

    if(confirm("删除负债？")){

        liabilityAgent.delete(id);

        refreshAll();

    }

}
// ======================

// 暴露给 HTML

// ======================

window.addNewAsset=addNewAsset;

window.editAsset=editAsset;

window.deleteAsset=deleteAsset;

window.addIncome=addIncome;

window.editIncome=editIncome;

window.deleteIncome=deleteIncome;

window.addInvestment=addInvestment;

window.editInvestment=editInvestment;

window.deleteInvestment=deleteInvestment;

window.addNewLiability=addNewLiability;

window.editLiability=editLiability;

window.deleteLiability=deleteLiability;

window.generateAdvisorReport=

generateAdvisorReport;

window.generateTaxReport=

generateTaxReport;

window.generateRetirementReport=

generateRetirementReport;

window.generateCFOReport=

generateCFOReport;
