/** @param {NS} ns **/
export async function main(ns) {
    ns.disableLog("ALL");

    if (!ns.stock.hasTIXAPIAccess()) {
        ns.tprint("❌ ERROR: You need TIX API Access to trade stocks!");
        return;
    }

    const has4S = ns.stock.has4SDataTIXAPI();
    const symbols = ns.stock.getSymbols();
    ns.tail();
    ns.resizeTail(600, 400);
    ns.moveTail(50, 50);

    const moneyReserve = 0.05;
    const refresh = 5000;
    let totalProfit = 0;
    const initialWealth = ns.getServerMoneyAvailable("home") + totalStockValue(ns, symbols);

    ns.tprint(`📈 Auto-stock trader started. ${symbols.length} symbols loaded.`);
    ns.tprint(`4S access: ${has4S ? "✅ yes" : "❌ no (using simple price-based strategy)"}`);

    while (true) {
        const cash = ns.getServerMoneyAvailable("home");
        const investable = cash * (1 - moneyReserve);
        let invested = 0;
        let profitNow = 0;

        for (const sym of symbols) {
            const pos = ns.stock.getPosition(sym);
            const shares = pos[0];
            const avg = pos[1];
            const ask = ns.stock.getAskPrice(sym);
            const bid = ns.stock.getBidPrice(sym);
            const forecast = has4S ? ns.stock.getForecast(sym) : null;
            const volatility = has4S ? ns.stock.getVolatility(sym) : null;

            // Simplified logic if no 4S
            const shouldBuy = has4S ? forecast > 0.55 : bid < ask * 0.98;
            const shouldSell = has4S ? forecast < 0.45 : bid > ask * 1.02;

            // BUY
            if (shouldBuy && shares === 0) {
                const maxShares = Math.floor(investable / (ask * 1.002));
                if (maxShares > 0) {
                    const cost = ns.stock.buyStock(sym, maxShares);
                    if (cost > 0) ns.print(`🟢 Bought ${maxShares}x ${sym} @ ${ask.toFixed(2)}`);
                }
            }

            // SELL
            if (shouldSell && shares > 0) {
                const sale = ns.stock.sellStock(sym, shares);
                if (sale > 0) {
                    const gain = (bid - avg) * shares;
                    totalProfit += gain;
                    ns.print(`🔴 Sold ${shares}x ${sym} (+${ns.formatNumber(gain)})`);
                }
            }

            if (shares > 0) {
                invested += shares * bid;
                profitNow += (bid - avg) * shares;
            }
        }

        const wealthNow = ns.getServerMoneyAvailable("home") + totalStockValue(ns, symbols);
        const netProfit = wealthNow - initialWealth;

        ns.clearLog();
        ns.print(` Cash: ${ns.formatNumber(cash)}`);
        ns.print(` Invested: ${ns.formatNumber(invested)}`);
        ns.print(` Session Profit: ${ns.formatNumber(totalProfit)} (Now: ${ns.formatNumber(profitNow)})`);
        ns.print(` Net Wealth Change: ${ns.formatNumber(netProfit)}`);
        ns.print(` Strategy: ${has4S ? "4S Forecast" : "Basic Price Spread"}`);

        await ns.sleep(refresh);
    }

    function totalStockValue(ns, symbols) {
        return symbols.reduce((sum, sym) => {
            const pos = ns.stock.getPosition(sym);
            return sum + pos[0] * ns.stock.getBidPrice(sym);
        }, 0);
    }
}
