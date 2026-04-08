import { useQuery } from "@tanstack/react-query"
import type { GetDistributorItemsSoldPerMonthResponse, GetDistributorItemsSoldResponse, GetDistributorMonthlySalesResponse, GetDistributorSalesByPeriodResponse, GetDistributorSalesParams, GetDistributorSalesResponse, Period } from "../types/distributorSale.type"
import { distributorSaleService } from "../service/distributorSaleService"

export const useDistributorSale = () => {

    const getAllDistributorSales = (params : GetDistributorSalesParams) => (
        useQuery<GetDistributorSalesResponse, Error>({
            queryKey: ['distributor-sales', params],
            queryFn: () => distributorSaleService.getAllDistributorSales(params),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    const getDistributorSales = (id: string, params: GetDistributorSalesParams) => (
        useQuery<GetDistributorSalesResponse, Error>({
            queryKey: ['distributor-sales', params],
            queryFn: () => distributorSaleService.getDistributorSales(id, params),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    const getAllDistributorSalesByPeriod = (period: Period) => (
        useQuery<GetDistributorSalesByPeriodResponse, Error>({
            queryKey: [`distributor-sales/${period}`],
            queryFn: () => distributorSaleService.getAllDistributorSalesByPeriod(period),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    const getDistributorSalesByPeriod = (id: string, period: Period) => (
        useQuery<GetDistributorSalesByPeriodResponse, Error>({
            queryKey: [`distributor-sales/${period}/${id}`],
            queryFn: () => distributorSaleService.getDistributorSalesByPeriod(id, period),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    const getAllDistributorItemsSoldByPeriod = (period: Period) => (
        useQuery<GetDistributorItemsSoldResponse, Error>({
            queryKey: [`distributor-sales/${period}/items`],
            queryFn: () => distributorSaleService.getAllDistributorItemsSoldByPeriod(period),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    const getDistributorItemsSoldByPeriod = (id: string, period: Period) => (
        useQuery<GetDistributorItemsSoldResponse, Error>({
            queryKey: [`distributor-sales/${period}/items/${id}`],
            queryFn: () => distributorSaleService.getDistributorItemsSoldByPeriod(id, period),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    const getAllDistributorMonthlySales = (year: number = 2024) => (
        useQuery<GetDistributorMonthlySalesResponse, Error>({
            queryKey: [`distributor-sales/monthly`, year],
            queryFn: () => distributorSaleService.getAllDistributorMonthlySales(year),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    const getDistributorMonthlySales = (id: string, year: number = 2024) => (
        useQuery<GetDistributorMonthlySalesResponse, Error>({
            queryKey: [`distributor-sales/monthly/${id}`, year],
            queryFn: () => distributorSaleService.getDistributorMonthlySales(id, year),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    
    const getAllDistributorItemsSoldPerMonth = (year: number = 2024) => (
        useQuery<GetDistributorItemsSoldPerMonthResponse, Error>({
            queryKey: [`distributor-sales/items-sold`, year],
            queryFn: () => distributorSaleService.getAllDistributorItemsSoldPerMonth(year),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    const getDistributorItemsSoldPerMonth = (id: string, year: number = 2024) => (
        useQuery<GetDistributorItemsSoldPerMonthResponse, Error>({
            queryKey: [`distributor-sales/items-sold/${id}`, year],
            queryFn: () => distributorSaleService.getDistributorItemsSoldPerMonth(id, year),
            placeholderData: (prev) => prev,
            refetchOnWindowFocus: false,
        })
    )

    return {
        getAllDistributorSales,
        getDistributorSales,
        getDistributorSalesByPeriod,
        getDistributorItemsSoldByPeriod,
        getDistributorMonthlySales,
        getDistributorItemsSoldPerMonth,
        getAllDistributorItemsSoldByPeriod,
        getAllDistributorItemsSoldPerMonth,
        getAllDistributorMonthlySales,
        getAllDistributorSalesByPeriod,
    }
}