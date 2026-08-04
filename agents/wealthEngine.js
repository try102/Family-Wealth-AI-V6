/*

 

Family Wealth AI OS

V7.0 Final Build

Wealth Engine

家庭财富统一总账引擎

*/

const wealthEngine = {

    name:

    "Wealth Engine V7.0 Final",

    // ======================

    // 安全读取

    // ======================

    getSummary(agent){

        if(

            agent

            &&

            agent.summary

        ){

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

        this.getSummary(

            liabilityAgent

        );

        let totalAssets =

            Number(

                assets.totalValue || 0

            )

            +

            Number(

                investment.totalValue || 0

            );

        let totalLiability =

        Number(

            liability.totalLiability || 0

        );

        return{

            totalAssets,

            totalLiability,

            netWorth:

            totalAssets

            -

            totalLiability,

            normalAssets:

            Number(

                assets.totalValue || 0

            ),

            investmentAssets:

            Number(

                investment.totalValue || 0

            ),

            totalIncome:

            Number(

                income.totalIncome || 0

            ),

            investmentProfit:

            Number(

                investment.profit || 0

            ),

            assetCount:

            assets.count || 0,

            investmentCount:

            investment.count || 0,

            liabilityCount:

            liability.count || 0

        };

    },

    // ======================

    // 资产分类

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

                item.category || "其他";

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

                item.type || "股票";

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

    // 配置比例

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

        .forEach(v=>{

            total += Number(v || 0);

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

            "房地产集中度较高，需要提高资产流动性"

            );

        }

        if(

            ratio["现金"]

            <

            10

        ){

            risk.push(

            "现金比例偏低，建议保持备用资金"

            );

        }

        if(

            risk.length===0

        ){

            risk.push(

            "当前资产结构较均衡"

            );

        }

        return{

            allocation,

            ratio,

            risk

        };

    },

    // ======================

    // 财务健康

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

        let total =

        wealth.totalAssets || 0;

        return{

            debtRatio:

            total===0

            ?

            0

            :

            Number(

            (

            wealth.totalLiability

            /

            total

            *

            100

            )

            .toFixed(2)

            ),

            liquidityRatio:

            total===0

            ?

            0

            :

            Number(

            (

            (allocation["现金"]||0)

            /

            total

            *

            100

            )

            .toFixed(2)

            ),

            investmentRatio:

            total===0

            ?

            0

            :

            Number(

            (

            (allocation["股票"]||0)

            /

            total

            *

            100

            )

            .toFixed(2)

            ),

            realEstateRatio:

            total===0

            ?

            0

            :

            Number(

            (

            (allocation["房产"]||0)

            /

            total

            *

            100

            )

            .toFixed(2)

            )

        };

    }

};

export default wealthEngine;
