import React, { useState, createContext, useEffect, useReducer } from "react";
import { api } from "./api";
import moment from "moment";

const DEFAULT_BASE_CURRENCY = "USD";
const DEFAULT_QUOTE_CURRENCY = "AUD";
const DEFAULT_BASE_VALUE = 100;

const reducer = (state, action) => {
    switch (action.type) {
        case "set_base":
            return {
                ...state,
                baseCurrency: action.payload.newBaseCurrency,
                date: action.payload.date,
                rates: action.payload.rates,
                quoteValue: action.payload.quoteValue,
            };
        case "set_quote":
            return {
                ...state,
                quoteCurrency: action.payload.newQuoteCurrency,
                quoteValue: action.payload.new_quote_value,
            };
        case "swap":
            return {
                ...state,
                baseCurrency: action.payload.quoteCurrency,
                quoteCurrency: action.payload.baseCurrency,
                rates: action.payload.rates,
                quoteValue: action.payload.quoteValue,
            };
        case "calculate":
            return {
                ...state,
                baseValue: action.payload.newBaseValue,
                quoteValue: action.payload.new_quote_value,
            };
        case "is_loading":
            return { ...state, isLoading: true };
        case "stop_loading":
            return { ...state, isLoading: false };
        default:
            return state;
    }
};

export const CurrencyStates = createContext();
export const CurrencyStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        baseCurrency: "",
        quoteCurrency: DEFAULT_QUOTE_CURRENCY,
        baseValue: DEFAULT_BASE_VALUE,
        quoteValue: 0,
        date: null,
        rates: [],
        isLoading: false,
    });

    const {
        baseCurrency,
        quoteCurrency,
        rates,
        date,
        baseValue,
        quoteValue,
        isLoading,
    } = state;

    useEffect(() => {
        setBaseCurrency(DEFAULT_BASE_CURRENCY);
    }, []);

    const setBaseCurrency = async (newBaseCurrency) => {
        dispatch({ type: "is_loading" });
        await api
            .get(`/${newBaseCurrency}`)
            .then((res) => {
                const data = res.data;
                const date = moment(data.time_last_update_utc).format(
                    "MMMM Do, YYYY"
                );
                const rates = data.conversion_rates;
                const quoteValue = (baseValue * rates[quoteCurrency]).toFixed(
                    4
                );
                dispatch({
                    type: "set_base",
                    payload: { newBaseCurrency, date, rates, quoteValue },
                });

                console.log(data);
            })
            .catch((err) => {
                throw new Error(err);
            });
        dispatch({ type: "stop_loading" });
    };

    const setQuoteCurrency = (newQuoteCurrency) => {
        const new_quote_value = (baseValue * rates[newQuoteCurrency]).toFixed(
            4
        );
        dispatch({
            type: "set_quote",
            payload: { newQuoteCurrency, new_quote_value },
        });
    };

    const swapCurrencies = async () => {
        dispatch({ type: "is_loading" });
        await api
            .get(`/${quoteCurrency}`)
            .then((res) => {
                const rates = res.data.conversion_rates;
                const quoteValue = (baseValue * rates[baseCurrency]).toFixed(4);
                dispatch({
                    type: "swap",
                    payload: { baseCurrency, quoteCurrency, rates, quoteValue },
                });
            })
            .catch((err) => {
                throw new Error(err);
            });
        dispatch({ type: "stop_loading" });
    };

    const calculateQuoteValue = (newBaseValue) => {
        newBaseValue = newBaseValue === "" ? 0 : parseFloat(newBaseValue);
        const new_quote_value = (newBaseValue * rates[quoteCurrency]).toFixed(
            4
        );
        dispatch({
            type: "calculate",
            payload: { newBaseValue, new_quote_value },
        });
    };

    const contextValue = {
        baseCurrency,
        quoteCurrency,
        rates,
        date,
        baseValue,
        quoteValue,
        isLoading,
        setBaseCurrency,
        setQuoteCurrency,
        swapCurrencies,
        calculateQuoteValue,
    };
    return (
        <CurrencyStates.Provider value={contextValue}>
            {children}
        </CurrencyStates.Provider>
    );
};
