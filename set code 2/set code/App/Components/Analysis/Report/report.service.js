(function () {
    angular.module("app")
        .factory("reportService", ["$odata", "$q", Service]);

    function Service($odata, $q) {
        return {
            list: function (countryPeriodUuid, reportName) {
                return $odata("CountryPeriod")
                    .id(countryPeriodUuid)
                    .property("reports/" + reportName)
                    .get();
            }, reports: function () {
                var reps = {
                    KPI: {
                        Name: "ESEP KPI Dashboard",
                        Reports: {
                            KLM: {
                                Name: "KLM Units",
                                Versions: {
                                    R6: {
                                        Name: "6 Months Rolling",
                                        ServiceFunction: "EXFOT12M6MR",
                                        Template: "ESEPDashboard",
                                        Description: "Operating tolerance - 6 month rolling",
                                        Level: "Brand Level"
                                    },
                                    R3: {
                                        Name: "KLM Units, 3 Month",
                                        Description: "Operating tolerance - 3 month rolling",
                                        Template: "ESEPDashboard",
                                        ServiceFunction: "EXFOT12M3MR",
                                        Level: "Brand Level"
                                    },
                                    R1: {
                                        Name: "KLM Units, 1 Month",
                                        Description: "Operating tolerance - 1 month rolling",
                                        Template: "ESEPDashboard",
                                        ServiceFunction: "EXFOT12M1MR",
                                        Level: "Brand Level"
                                    }
                                }
                            },
                            Sales: {
                                Name: "Sales",
                                Versions: {
                                    R6: {
                                        Name: "Sales, 6 Month",
                                        Description: "Operating tolerance - 6 month rolling",
                                        Template: "ESEPDashboard",
                                        ServiceFunction: "SKUEXFOT12M6MR",
                                        Level: "Sku Level"
                                    },
                                    R3: {
                                        Name: "Sales, 3 Month",
                                        Description: "Operating tolerance - 3 month rolling",
                                        Template: "ESEPDashboard",
                                        ServiceFunction: "SKUEXFOT12M3MR",
                                        Level: "Sku Level"
                                    },
                                    R1: {
                                        Name: "Sales, 1 Month",
                                        Description: "Operating tolerance - 1 month rolling",
                                        Template: "ESEPDashboard",
                                        ServiceFunction: "SKUEXFOT12M1MR",
                                        Level: "Sku Level"
                                    }
                                }
                            }
                        }
                    },
                    OperatingTolerance: {
                        Name: "Operating Tolerance by Brand",
                        Reports: {
                            OperatingTolerance: {
                                Name: "Operating tolerance in %",
                                Version: {
                                    R6: {
                                        Name: "Operating Tolerance in %, 6 months rolling",
                                        Description: "",
                                        Template: "Percent18",
                                        ServiceFunction: "OT18M6MR"
                                    },
                                    R3: {
                                        Name: "Operating Tolerance in %, 3 months rolling",
                                        Description: "",
                                        Template: "Percent12",
                                        ServiceFunction: "OT12M3MR"
                                    },
                                    R1: {
                                        Name: "Operating Tolerance in %",
                                        Description: "",
                                        Template: "Percent12",
                                        ServiceFunction: "OT12M1MR"
                                    }
                                }
                            },
                            ExFactory: {
                                Name: "Ex-Factory KLM",
                                Version: {
                                    R6: {
                                        Name: "Ex-factory KLM, 6 months rolling",
                                        Description: "",
                                        Template: "Absolute18",
                                        ServiceFunction: "EXF18M6MR"
                                    },
                                    R3: {
                                        Name: "Ex-factory KLM, 3 months rolling",
                                        Description: "",
                                        Template: "Absolute12",
                                        ServiceFunction: "EXF12M3MR"
                                    },
                                    R1: {
                                        Name: "Ex-factory KLM",
                                        Description: "",
                                        Template: "Absolute12",
                                        ServiceFunction: "EXF12M1MR"
                                    }
                                }
                            },
                            InMarket: {
                                Name: "In-Market demand KLM",
                                Version: {
                                    R6: {
                                        Name: "In-Market demand KLM, 6 months rolling",
                                        Description: "",
                                        Template: "Absolute18",
                                        ServiceFunction: "IMD18M6MR"
                                    },
                                    R3: {
                                        Name: "Ex-factory KLM, 3 months rolling",
                                        Description: "",
                                        Template: "Absolute12",
                                        ServiceFunction: "EXF12M3MR"
                                    },
                                    R1: {
                                        Name: "In-Market demand KLM",
                                        Description: "",
                                        Template: "Absolute12",
                                        ServiceFunction: "IMD12M1MR"
                                    }
                                }
                            }
                        }
                    },
                    Summary: {
                        Name: "Dashboard Summary",
                        Reports: {
                            //Summary: {
                            //    Name: "Summary",
                            //    Versions: {
                            //        R6: {
                            //            Name: "Summary - 6 Month rolling",
                            //            Description: "6 month rolling",
                            //            Template: "Summary",
                            //            ServiceFunction: "Summary6MR"
                            //        },
                            //        R3: {
                            //            Name: "Summary - 3 Month rolling",
                            //            Description: "3 month rolling",
                            //            Template: "Summary",
                            //            ServiceFunction: "Summary3MR"
                            //        }
                            //    }

                            //},
                            //Flow: {
                            //    Name: "Overview In-flow vs. Out-flow",
                            //    Versions: {
                            //        Global: {
                            //            Name: "Global Overview In-flow vs. Out-flow",
                            //            Description: "Overview In-flow vs. Out-flow",
                            //            Type: "Global",
                            //            Template: "Flow",
                            //            ServiceFunction: "FlowGlobal",
                            //            properties: ["brandUuid"]
                            //        },
                            //        Local: {
                            //            Name: "Overview In-flow vs. Out-flow",
                            //            Description: "Overview In-flow vs. Out-flow ",
                            //            Type: "Local",
                            //            Template: "Flow",
                            //            ServiceFunction: "FlowCountry"
                            //        }
                            //    }
                            //},
                            //Supply: {
                            //    Name: "Supply",
                            //    Versions: {
                            //        Undersupply: {
                            //            Name: "Undersupply 3 months rolling",
                            //            Description: "",
                            //            Type: "Undersupply",
                            //            Template: "Supply",
                            //            ServiceFunction: "Undersupply"
                            //        },
                            //        Oversupply: {
                            //            Name: "Oversupply 3 months rolling",
                            //            Type: "Oversupply",
                            //            Description: "",
                            //            Template: "Supply",
                            //            ServiceFunction: "Oversupply"
                            //        }
                            //    }
                            //},
                            EmergencyChannel: {
                                Name: "Emergency Channel",
                                Versions: {
                                    R6: {
                                        Name: "Emergency Channel - 6 Months rolling",
                                        Description: "6 month rolling",
                                        Template: "EmergencyChannel",
                                        ServiceFunction: "EC6MR"
                                    },
                                    R3: {
                                        Name: "Emergency Channel - 3 Months rolling",
                                        Description: "3 month rolling",
                                        Template: "EmergencyChannel",
                                        ServiceFunction: "EC3MR"
                                    },
                                    R1: {
                                        Name: "Emergency Channel - 1 Months rolling",
                                        Description: "1 month rolling",
                                        Template: "EmergencyChannel",
                                        ServiceFunction: "EC1MR"
                                    }
                                }
                            }
                        }
                    }
                };
                return $q.when(reps);
            }
        };
    }
})()