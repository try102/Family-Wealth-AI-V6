/*

 

Family Wealth AI OS

V6.5.0 Upgrade Build

Wealth Engine

家庭财富统一总账引擎

Compatible with V6.4.2

*/

const wealthEngine={

    name:

    "Wealth Engine V6.5.0 Stable",

    // ======================

    // 安全读取

    // ======================

    getSummary(agent){

        if(!agent){

            return {};

        }

        if(agent.summary){

            return agent.summary();

        }

        return {};

    },

    // ======================

    // 财富总览

    // ======================

    summary(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    ){

        let assets =

        this.getSummary(

            assetsAgent

        );

        let investment =

        this.getSummary(

            investmentAgent

        );

        let income =

        this.getSummary(

            incomeAgent

        );

        let liability =

        liabilityAgent

        &&

        liabilityAgent.summary

        ?

        liabilityAgent.summary()

        :

        {};

        let normalAssets =

        Number(

            assets.totalValue || 0

        );

        let investmentAssets =

        Number(

            investment.totalValue || 0

        );

        let totalAssets =

        normalAssets

        +

        investmentAssets;

        let totalLiability =

        Number(

            liability.totalLiability

            ||

            liability.totalValue

            ||

            0

        );

        return{

            totalAssets,

            totalLiability,

            netWorth:

            totalAssets

            -

            totalLiability,

            normalAssets,

            investmentAssets,

            totalIncome:

            Number(

                income.totalIncome

                ||

                0

            ),

            investmentProfit:

            Number(

                investment.profit

                ||

                0

            ),

            assetCount:

            assets.count || 0,

            investmentCount:

            investment.count || 0,

            incomeCount:

            income.count || 0

        };

    },

    // ======================

    // 资产配置金额

    // ======================

    assetAllocation(

        assetsAgent,

        investmentAgent

    ){

        let result={};

        if(

            assetsAgent

            &&

            assetsAgent.view

        ){

            assetsAgent.view()

            .forEach(item=>{

                let category =

                item.category

                ||

                "其他";

                if(!result[category]){

                    result[category]=0;

                }

                result[category]+=

                Number(

                    item.value || 0

                );

            });

        }

        if(

            investmentAgent

            &&

            investmentAgent.inventory

        ){

            investmentAgent.inventory()

            .forEach(item=>{

                let category =

                item.type

                ||

                "投资资产";

                if(!result[category]){

                    result[category]=0;

                }

                result[category]+=

                Number(

                    item.marketValue || 0

                );

            });

        }

        return result;

    },

    // ======================

    // 财富结构分析

    // ======================

    allocationAnalysis(

        assetsAgent,

        investmentAgent

    ){

        let allocation =

        this.assetAllocation(

            assetsAgent,

            investmentAgent

        );

        let total=0;

        Object.values(allocation)

        .forEach(value=>{

            total +=

            Number(value || 0);

        });

        let ratio={};

        Object.keys(allocation)

        .forEach(key=>{

            ratio[key]=

            total===0

            ?

            0

            :

            Number(

                (

                allocation[key]

                /

                total

                *

                100

                )

                .toFixed(2)

            );

        });

        let risk=[];

        if(

            ratio["房产"]

            >

            70

        ){

            risk.push(

            "房产占比较高，资产流动性需要关注"

            );

        }

        if(

            ratio["现金"]

            <

            10

        ){

            risk.push(

            "现金比例较低，需要保持备用资金"

            );

        }

        if(

            risk.length===0

        ){

            risk.push(

            "当前资产结构较为均衡"

            );

        }

        return{

            allocation,

            ratio,

            risk

        };

    },

    // ======================

    // V6.5 新增

    // 财务健康分析

    // ======================

    financialHealth(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    ){

        let wealth =

        this.summary(

            assetsAgent,

            investmentAgent,

            incomeAgent,

            liabilityAgent

        );

        let allocation =

        this.assetAllocation(

            assetsAgent,

            investmentAgent

        );

        let totalAssets =

        wealth.totalAssets || 0;

        let debtRatio =

        totalAssets===0

        ?

        0

        :

        Number(

            (

            wealth.totalLiability

            /

            totalAssets

            *

            100

            )

            .toFixed(2)

        );

        let realEstate =

        allocation["房产"]

        ||

        0;

        let cash =

        allocation["现金"]

        ||

        0;

        let investment =

        allocation["股票"]

        ||

        allocation["投资资产"]

        ||

        0;

        return{

            debtRatio,

            liquidityRatio:

            totalAssets===0

            ?

            0

            :

            Number(

                (

                cash

                /

                totalAssets

                *

                100

                )

                .toFixed(2)

            ),

            investmentRatio:

            totalAssets===0

            ?

            0

            :

            Number(

                (

                investment

                /

                totalAssets

                *

                100

                )

                .toFixed(2)

            ),

            realEstateRatio:

            totalAssets===0

            ?

            0

            :

            Number(

                (

                realEstate

                /

                totalAssets

                *

                100

                )

                .toFixed(2)

            ),

            annualCashFlow:

            wealth.totalIncome || 0

        };

    },

    // ======================

    // 完整报告

    // ======================

    report(

        assetsAgent,

        investmentAgent,

        incomeAgent,

        liabilityAgent

    ){

        return{

            summary:

            this.summary(

                assetsAgent,

                investmentAgent,

                incomeAgent,

                liabilityAgent

            ),

            allocation:

            this.assetAllocation(

                assetsAgent,

                investmentAgent

            ),

            allocationAnalysis:

            this.allocationAnalysis(

                assetsAgent,

                investmentAgent

            ),

            financialHealth:

            this.financialHealth(

                assetsAgent,

                investmentAgent,

                incomeAgent,

                liabilityAgent

            )

        };

    }

};

export default wealthEngine;
