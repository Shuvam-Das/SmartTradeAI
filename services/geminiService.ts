// This is a MOCK service. In a real application, you would implement the actual Gemini API calls.
// Note: The @google/genai package is not actually installed in this environment,
// so this is for demonstration purposes.

import { StockDetails } from "../types";

// Mocking the GoogleGenAI class and its methods
// In a real project, you would import this: import { GoogleGenAI } from "@google/genai";
class MockGoogleGenAI {
    apiKey: string | undefined;

    constructor(config: { apiKey: string | undefined }) {
        this.apiKey = config.apiKey;
    }

    get models() {
        return {
            generateContent: async (params: { model: string, contents: string }) => {
                console.log("Mocking Gemini API call with params:", params);
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                if (!this.apiKey) {
                    return { text: "API Key not configured. Please set up your API key." };
                }

                // Simulate a plausible AI response based on a prompt
                const prompt = params.contents.toLowerCase();
                let responseText = "I am SmartTradeAI. How can I assist with your trading strategy today?";

                 if (prompt.includes("generate profit booking strategy")) {
                    const symbolMatch = prompt.match(/for (\w+)/);
                    const symbol = symbolMatch ? symbolMatch[1].toUpperCase() : 'the stock';
                    responseText = `**AI-Generated Profit Booking Strategy for ${symbol}:**

Based on recent volatility and short-term momentum indicators, a balanced risk-reward strategy is recommended.

*   **Profit Target:** A **+10%** gain from the current price is an achievable target in the current market conditions.
*   **Stop-Loss:** A **-5%** stop-loss from the current price will protect against significant downside risk.

**Rationale:**
*   This strategy aims for a 2:1 risk-reward ratio.
*   The levels are set outside of typical daily price fluctuations to avoid premature exits.
*   Activating this will allow the AI agent to monitor and execute the trade automatically.`;
                } else if (prompt.includes("trading strategy")) {
                    const symbolMatch = prompt.match(/for (?:the stock )?([\w\s\d\.-]+)/);
                    const symbol = symbolMatch && symbolMatch[1] ? symbolMatch[1].trim().toUpperCase() : 'the selected stock';
                     responseText = `**Simple Momentum Strategy for ${symbol}:**

This strategy aims to capitalize on the stock's current upward trend.

*   **Entry Signal:** Buy when the stock price closes above its **20-day simple moving average (SMA)** on the daily chart. This indicates positive short-term momentum.
*   **Exit Signal (Profit Taking):** Sell when the stock price closes **15%** above your entry price.
*   **Stop-Loss:** Place a hard stop-loss **5%** below your entry price to limit potential downside.

**Conditions to Avoid:**
*   Do not enter a trade if the **Relative Strength Index (RSI)** is above **70**, as the stock may be overbought and due for a pullback.
*   Avoid trading during major news events or quarterly earnings announcements due to high volatility.`;
                } else if (prompt.includes("tata motors") && prompt.includes("bullish")) {
                    responseText = `**Bullish Analysis for Tata Motors (TATAMOTORS):**

This view focuses on the significant upside potential driven by market leadership and strategic growth.

*   **Dominant EV Position:** Tata Motors has a commanding lead in India's passenger EV market. Continued government support and rising fuel prices create a strong tailwind for EV sales growth.
*   **JLR Turnaround:** The Jaguar Land Rover business is showing a strong recovery with improved margins, a healthy order book, and a clear electrification roadmap. This is a major positive catalyst.
*   **Strong Domestic Demand:** The commercial and passenger vehicle segments in India are experiencing robust demand, which is expected to continue.

**Trading View:**
*   **Key Resistance Breakout:** A sustained move above **₹1050** could signal the start of a new uptrend towards **₹1150-₹1200**.
*   **Buy on Dips:** Consider accumulating shares on any dips towards the support level of **₹980**.`;
                } else if (prompt.includes("tata motors") && prompt.includes("bearish")) {
                     responseText = `**Bearish Analysis for Tata Motors (TATAMOTORS):**

This view considers potential headwinds and risks that could impact the stock's performance.

*   **Intensifying Competition:** Competition in the EV space is heating up with both domestic (Mahindra) and international (MG, Hyundai) players launching new models. This could erode Tata's market share.
*   **Global Macro Risks:** The JLR business is sensitive to global economic slowdowns, particularly in key markets like Europe and China. Geopolitical tensions could also disrupt supply chains.
*   **Raw Material Costs:** Fluctuations in the prices of key commodities like steel, aluminum, and battery components can put pressure on margins.

**Trading View:**
*   **Potential for Correction:** If the stock fails to break the strong resistance at **₹1050**, it could see a correction back to its primary support level around **₹940**.
*   **Risk Management:** A break below **₹940** would be a significant bearish signal and could trigger a deeper sell-off.`;
                } else if (prompt.includes("reliance") && prompt.includes("bullish")) {
                    responseText = `**Bullish Analysis for Reliance Industries (RELIANCE):**

This analysis focuses on the positive catalysts driving potential growth for Reliance.

*   **Retail & Telecom Dominance:** Jio and Reliance Retail are market leaders with massive subscriber bases, providing stable and growing revenue streams.
*   **New Energy Business:** The company's aggressive push into green energy (solar, hydrogen) is a significant long-term growth driver that could lead to a major re-rating.
*   **Strong Financials:** A robust balance sheet and strong cash flows allow for continued large-scale investments and acquisitions.

**Trading View:**
*   **Key Support:** The stock has strong support near **₹2950**.
*   **Upside Target:** A sustained move above **₹3100** could pave the way for a test of all-time highs.`;
                } else if (prompt.includes("reliance") && prompt.includes("bearish")) {
                    responseText = `**Bearish Analysis for Reliance Industries (RELIANCE):**

This analysis considers potential risks that could pressure the stock.

*   **Valuation Concerns:** The stock trades at a premium valuation, making it susceptible to corrections during market downturns.
*   **Regulatory Scrutiny:** As a dominant player in multiple sectors, Reliance faces ongoing regulatory oversight which could pose risks.
*   **Execution Risk in New Ventures:** The ambitious green energy plans involve significant capital expenditure and execution risk. Any delays could disappoint investors.

**Trading View:**
*   **Resistance:** The stock faces significant resistance near the **₹3100** level.
*   **Downside Risk:** A break below the key support of **₹2950** could trigger a correction towards **₹2800**.`;
                } else if (prompt.includes("hdfcbank") && prompt.includes("bullish")) {
                    responseText = `**Bullish Analysis for HDFC Bank (HDFCBANK):**

This view focuses on the long-term strengths and recovery potential of the banking giant.

*   **Market Leader:** As one of India's largest private sector banks, it benefits from a strong brand, vast distribution network, and a large, stable deposit base.
*   **Post-Merger Synergies:** The merger with HDFC Ltd is expected to unlock significant cross-selling opportunities and improve the loan book mix over the long term.
*   **Attractive Valuation:** The stock has seen a correction and is trading at valuations that are attractive relative to its historical premium, presenting a potential entry point for long-term investors.

**Trading View:**
*   **Key Support:** A strong support base has formed around the **₹1650** level.
*   **Potential Target:** A sustained move above **₹1750** could signal a reversal and a move towards **₹1850**.`;
                } else if (prompt.includes("hdfcbank") && prompt.includes("bearish")) {
                     responseText = `**Bearish Analysis for HDFC Bank (HDFCBANK):**

This view considers the near-term challenges and risks that could continue to weigh on the stock.

*   **Margin Pressure:** Increased competition for deposits and the integration of a lower-yielding mortgage book could put pressure on Net Interest Margins (NIMs) in the short to medium term.
*   **FII Outflows:** The stock has been subject to significant selling pressure from foreign institutional investors, which could continue if global macro concerns persist.
*   **Integration Hurdles:** Integrating a large entity like HDFC Ltd comes with execution risks and potential for short-term operational disruptions.

**Trading View:**
*   **Strong Resistance:** The stock faces a significant hurdle at the **₹1750** level.
*   **Downside Risk:** A decisive break below the **₹1650** support could lead to a further decline towards **₹1580**.`;
                } else if (prompt.includes("tata motors")) {
                    responseText = `**Analysis for Tata Motors (TATAMOTORS):**

*   **Sector Strength:** A key player in the burgeoning Indian EV market.
*   **Recent Performance:** Sales figures show consistent growth, indicating strong consumer demand.
*   **Catalysts:** Upcoming new model launches could provide a significant boost to revenue.

**Technical Outlook:**
*   **Resistance:** Potential breakout zone identified above **₹1050**.
*   **Support & Entry:** A good entry point could be around **₹980**.
*   **Stop-Loss:** Recommend placing a stop-loss at **₹940** to manage risk.`;
                } else if (prompt.includes("reliance")) {
                    responseText = `**Analysis for Reliance Industries (RELIANCE):**

*   **Momentum:** Showing strong bullish momentum with high recent trading volumes.
*   **Sentiment:** Positive news flow surrounding their green energy and retail businesses.
*   **RSI:** The Relative Strength Index is at **65**, which is approaching overbought territory. This calls for some caution.

**Trading Strategy:**
*   **Short-term Target:** A plausible target seems to be **₹3,200**.
*   **Stop-Loss:** Consider setting a stop-loss around **₹2,950** to protect capital.`;
                } else if (prompt.includes("nifty")) {
                    responseText = `**Nifty 50 Weekly Outlook:**

The index is currently trading near a critical resistance level of **23,500**.

*   **Bullish Scenario:** A decisive breakout above this level could trigger a rally towards the next psychological level of **24,000**.
*   **Bearish Scenario:** Failure to break resistance may lead to a consolidation or a minor pullback towards **23,200**.
*   **Market Cues:** Global market trends are mixed, suggesting potential for volatility.

**Strategy Recommendation:**
*   A **long straddle** on weekly options could be a viable strategy to profit from a large move in either direction.`;
                } else if (prompt.includes("portfolio")) {
                     responseText = `**Portfolio Analysis:**

Based on your holdings, your portfolio has a heavy concentration in the **IT sector**. While this sector has strong long-term prospects, over-concentration introduces risk.

**Recommendations for Diversification:**
*   **Hedge Risk:** Consider reducing exposure to one of your smaller IT holdings and reallocating capital.
*   **Add Financials:** The **Banking sector** offers a good hedge. **HDFC Bank** is a strong candidate due to its solid fundamentals and recent price correction.
*   **Add FMCG:** For stable, defensive growth, consider adding a company from the FMCG sector like **Hindustan Unilever**.`;
                } else if (prompt.includes("banking sector")) {
                    responseText = `**Banking Sector Outlook:**

The sector outlook is currently **positive**, driven by strong credit growth and improving asset quality across the board.

**Top Stock Picks:**
*   **Large Cap:** **HDFC Bank** and **ICICI Bank** remain top-tier choices for their stability and market leadership.
*   **Aggressive Play:** For higher risk-reward, **IDFC First Bank** presents an interesting opportunity due to its high growth potential and expanding retail loan book.`;
                } else if (prompt.includes("ev sector")) {
                     responseText = `**Indian EV Sector Analysis:**

The EV sector is a high-growth area supported by government policies and increasing consumer adoption.

**Key Stocks to Watch:**
*   **OEMs:** **Tata Motors** is the current market leader. Also, keep an eye on **Mahindra & Mahindra** as they ramp up their EV offerings.
*   **Charging Infrastructure:** **Tata Power** is making significant investments in building a nationwide charging network.
*   **Battery Technology:** **Exide Industries** and **Amara Raja Batteries** are key players in the battery ecosystem, which is critical for EV growth.`;
                } else if (prompt.includes("why buy bajfinance")) {
                    responseText = `**Investment Rationale for Bajaj Finance (BAJFINANCE):**

*   **Market Leadership:** Dominant player in the consumer finance space with a massive customer base and strong brand recognition.
*   **Consistent Growth:** Has a long track record of delivering high revenue and profit growth year over year.
*   **Digital Transformation:** Aggressive investment in their digital ecosystem and app is improving customer acquisition and operational efficiency.
*   **Valuation:** While trading at a premium valuation, it is often justified by its superior growth metrics compared to peers. A good stock for long-term growth portfolios.`;
                } else if (prompt.includes("find oversold tech stocks")) {
                    responseText = `**AI Analysis: Oversold Tech Stocks**

Based on your criteria (RSI < 30 in the IT Sector), here are a couple of potential opportunities:

*   **INFY (Infosys Ltd):** The stock has recently seen a sharp pullback due to broader market concerns, pushing its RSI into oversold territory. This could be a buying opportunity for long-term investors, as the company's fundamentals remain strong.
*   **WIPRO (Wipro Ltd):** Wipro has been underperforming the sector, and its RSI is currently below 30. A mean reversion trade could be considered, but it's important to watch for a confirmation of a trend reversal.`;
                } else if (prompt.includes("find stocks with a golden cross")) {
                    responseText = `**AI Analysis: Stocks with a Golden Cross**

A "Golden Cross" is a bullish technical signal where the 50-day moving average crosses above the 200-day moving average. Based on recent chart patterns, here is a candidate:

*   **TITAN (Titan Company Ltd):** The stock has recently exhibited a Golden Cross, indicating a potential long-term uptrend. This is supported by strong consumer demand in the jewelry and watches segments. It's a strong candidate for a long-term portfolio.`;
                }


                return { text: responseText };
            }
        };
    }
}


const ai = new MockGoogleGenAI({ apiKey: process.env.API_KEY || "mock_api_key_present" });

export const getAIAnalysis = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching AI analysis:", error);
        return "An error occurred while communicating with the AI. Please check the console for details.";
    }
};

export const getStockDetails = async (symbol: string): Promise<StockDetails> => {
    // Simulate network delay for fetching details
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Fetching details for:", symbol);

    // Mock data for different stocks
    switch (symbol) {
        case 'BAJFINANCE':
            return {
                marketCap: '₹4,42,000 Cr',
                peRatio: 35.8,
                dividendYield: '0.51%',
                eps: 201.2,
                bookValue: 1540.8,
                overview: "Bajaj Finance Limited is one of India's largest non-banking financial companies (NBFCs). The company deals in consumer finance, SME and commercial lending, and wealth management.",
                aiRationale: "Dominant player in consumer finance with a massive customer base. Consistent high revenue and profit growth, coupled with a successful digital transformation, justifies its premium valuation for long-term growth investors."
            };
        case 'INFY':
            return {
                marketCap: '₹6,05,000 Cr',
                peRatio: 23.5,
                dividendYield: '2.50%',
                eps: 61.7,
                bookValue: 250.4,
                overview: "Infosys Limited is a global leader in next-generation digital services and consulting. It enables clients in more than 50 countries to navigate their digital transformation.",
                aiRationale: "A blue-chip IT stock currently in oversold territory due to market pullback. Strong fundamentals, global presence, and a healthy dividend yield make it an attractive long-term buying opportunity at current levels."
            };
        case 'WIPRO':
             return {
                marketCap: '₹2,35,000 Cr',
                peRatio: 20.1,
                dividendYield: '1.20%',
                eps: 22.4,
                bookValue: 155.6,
                overview: "Wipro Limited is a leading global information technology, consulting and business process services company. They harness the power of cognitive computing, hyper-automation, robotics, cloud, analytics and emerging technologies.",
                aiRationale: "Another major IT player that has underperformed the sector, pushing its technical indicators into the oversold zone. While facing some near-term headwinds, it presents a potential value play or mean reversion trade opportunity for investors."
             };
        default:
            return {
                marketCap: 'N/A',
                peRatio: 'N/A',
                dividendYield: 'N/A',
                eps: 0,
                bookValue: 0,
                overview: "Detailed information for this stock is not available in the mock data set.",
                aiRationale: "AI analysis could not be performed as detailed financial data is unavailable."
            };
    }
};