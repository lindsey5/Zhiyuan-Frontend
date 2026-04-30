import type { WithdrawalRequest } from "../../types/withdrawalRequest.type";
import { formatDate, formatToPeso } from "../../utils/utils";
import Button from "../ui/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PrintReceiptButton({
    withdrawalRequest,
}: {
    withdrawalRequest: WithdrawalRequest | null;
}) {
    const handleDownloadPDF = async () => {
        if (!withdrawalRequest) return;

        const element = document.getElementById("withdrawal-receipt");
        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 2,
            backgroundColor: "#ffffff",
            useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        pdf.save(
            `${withdrawalRequest.distributor.distributor_id}_withdrawal_receipt_${Date.now()}.pdf`
        );
    };

    return (
        <>
            <Button
                label="Print Receipt"
                className="text-xs"
                onClick={handleDownloadPDF}
            />

            <div className="fixed top-0 left-0 opacity-0 pointer-events-none">
                <div
                    id="withdrawal-receipt"
                    style={{
                        backgroundColor: "#ffffff",
                        color: "#111",
                        width: "520px",
                        minHeight: "700px",
                        padding: "48px 52px",
                        fontFamily: "Georgia, serif",
                        position: "relative",
                        boxSizing: "border-box",
                    }}
                >
                    {/* HEADER */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
                        <div>
                            <p style={{ margin: "0 0 2px", fontSize: "17px", fontWeight: "bold", color: "#1a1a2e", fontFamily: "Georgia, serif" }}>
                                Zhiyuan Enterprise Group Inc.
                            </p>
                            <p style={{ margin: 0, fontSize: "12px", color: "#777", fontFamily: "Arial, sans-serif" }}>
                                Official Withdrawal Receipt
                            </p>
                        </div>

                        <div style={{
                            width: "60px",
                            height: "60px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <img
                                src="/dark-logo.png"
                                alt="Logo"
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                    </div>

                    {/* META BAR (NO ID NOW) */}
                    <div style={{
                        borderTop: "2px solid #1a1a2e",
                        borderBottom: "0.5px solid #ccc",
                        padding: "6px 0",
                        marginBottom: "28px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <span style={{
                            fontSize: "11px",
                            color: "#444",
                            fontFamily: "Arial, sans-serif",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase"
                        }}>
                            Receipt
                        </span>

                        <span style={{
                            fontSize: "11px",
                            color: "#444",
                            fontFamily: "Arial, sans-serif"
                        }}>
                            {formatDate(withdrawalRequest?.createdAt ?? "")}
                        </span>
                    </div>

                    {/* ISSUED TO */}
                    <div style={{ marginBottom: "28px" }}>
                        <p style={{
                            margin: "0 0 6px",
                            fontSize: "10px",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "#888",
                            fontFamily: "Arial, sans-serif"
                        }}>
                            Issued To
                        </p>

                        <p style={{
                            margin: "0 0 2px",
                            fontSize: "15px",
                            fontWeight: "bold",
                            fontFamily: "Georgia, serif"
                        }}>
                            {withdrawalRequest?.distributor.distributor_name}
                        </p>

                        <p style={{
                            margin: 0,
                            fontSize: "13px",
                            color: "#555",
                            fontFamily: "Arial, sans-serif"
                        }}>
                            {withdrawalRequest?.distributor.email}
                        </p>
                    </div>

                    {/* TABLE */}
                    <table style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "13px",
                        fontFamily: "Arial, sans-serif",
                        marginBottom: "28px"
                    }}>
                        <tbody>
                            <tr>
                                <td style={{ padding: "9px 12px", border: "0.5px solid #ddd" }}>
                                    Withdrawal Method
                                </td>
                                <td style={{ padding: "9px 12px", textAlign: "right", fontWeight: "bold", border: "0.5px solid #ddd" }}>
                                    {withdrawalRequest?.withdrawal_method.type.toUpperCase()}
                                </td>
                            </tr>

                            <tr style={{ background: "#fafaf8" }}>
                                <td style={{ padding: "9px 12px", border: "0.5px solid #ddd" }}>
                                    Date Requested
                                </td>
                                <td style={{ padding: "9px 12px", textAlign: "right", border: "0.5px solid #ddd" }}>
                                    {formatDate(withdrawalRequest?.createdAt ?? "")}
                                </td>
                            </tr>
                        </tbody>

                        <tfoot>
                            <tr style={{ background: "#1a1a2e" }}>
                                <td style={{
                                    padding: "11px 12px",
                                    color: "#aab",
                                    fontSize: "12px",
                                    textTransform: "uppercase"
                                }}>
                                    Total Amount
                                </td>

                                <td style={{
                                    padding: "11px 12px",
                                    textAlign: "right",
                                    color: "#fff",
                                    fontSize: "17px",
                                    fontWeight: "bold"
                                }}>
                                    {formatToPeso(withdrawalRequest?.amount ?? 0)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* NOTE */}
                    <p style={{
                        fontSize: "11px",
                        color: "#999",
                        fontFamily: "Arial, sans-serif",
                        lineHeight: "1.6",
                        marginBottom: "48px"
                    }}>
                        This is an official receipt issued by Zhiyuan Enterprise Group Inc.
                    </p>

                    {/* SIGNATURES */}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {["Distributor's Signature", "Authorized Signatory"].map((label) => (
                            <div key={label} style={{ width: "180px", textAlign: "center" }}>
                                <div style={{ height: "44px", borderBottom: "1px solid #333" }} />
                                <p style={{
                                    margin: "7px 0 0",
                                    fontSize: "10px",
                                    textTransform: "uppercase",
                                    color: "#555"
                                }}>
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}