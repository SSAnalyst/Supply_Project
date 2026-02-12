(function () {
    angular.module("app")
        .factory("regionOverview.ReportService", ["$odata", "$q", Service]);

    function Service($odata, $q) {
        var service  = {
            list: function (countryPeriodUuid, reportName, properties) {
                return $odata("Period")
                    .id(countryPeriodUuid)
                    .property("reports/" + reportName)
                    .get(properties);
            },
            brands: function () {
                return $odata("Brand").get().then(function (data) {
                    return data.results;
                });
            }, reports: function () {
                var reps = {
                    KPI: {
                        Name: "ESEP KPI Dashboard",
                        Reports: {
                            KLM: {
                                Name: "KLM Units",
                                Rolling: true,
                                Versions: {
                                    R6: {
                                        Name: "6 Months Rolling",
                                        ServiceFunction: "EXFOT12M6MR",
                                        Template: "ESEPDashboard",
                                        Description: "Operating tolerance - 6 month rolling",
                                        Level: "Brand Level"
                                    },
                                    R3: {
                                        Name: "3 Months rolling",
                                        Description: "Operating tolerance - 3 month rolling",
                                        Template: "ESEPDashboard",
                                        ServiceFunction: "EXFOT12M3MR",
                                        Level: "Brand Level"
                                    },
                                    R1: {
                                        Name: "1 Month rolling",
                                        Description: "Operating tolerance - 1 month rolling",
                                        Template: "ESEPDashboard",
                                        ServiceFunction: "EXFOT12M1MR",
                                        Level: "Brand Level"
                                    }
                                }
                            },
                            Sales: {
                                Name: "Sales",
                                Rolling: true,
                                Versions: {
                                    R6: {
                                        Name: "6 Months rolling",
                                        Description: "Operating tolerance - 6 month rolling",
                                        Template: "SalesDashboard",
                                        ServiceFunction: "SKUEXFOT12M6MR",
                                        Level: "Sku Level"
                                    },
                                    R3: {
                                        Name: "3 Months rolling",
                                        Description: "Operating tolerance - 3 month rolling",
                                        Template: "SalesDashboard",
                                        ServiceFunction: "SKUEXFOT12M3MR",
                                        Level: "Sku Level"
                                    },
                                    R1: {
                                        Name: "1 Month rolling",
                                        Description: "Operating tolerance - 1 month rolling",
                                        Template: "SalesDashboard",
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
                                Rolling: true,
                                Versions: {
                                    R6: {
                                        Name: "6 Months rolling",
                                        Description: "",
                                        Template: "Percent18",
                                        ServiceFunction: "OT18M6MR"
                                    },
                                    R3: {
                                        Name: "3 Months rolling",
                                        Description: "",
                                        Template: "Percent12",
                                        ServiceFunction: "OT12M3MR"
                                    },
                                    R1: {
                                        Name: "1 Month rolling",
                                        Description: "",
                                        Template: "Percent12",
                                        ServiceFunction: "OT12M1MR"
                                    }
                                }
                            },
                            ExFactory: {
                                Name: "Ex-Factory KLM",
                                Rolling: true,
                                Versions: {
                                    R6: {
                                        Name: "6 Months rolling",
                                        Description: "",
                                        Template: "Absolute18",
                                        ServiceFunction: "EXF18M6MR"
                                    },
                                    R3: {
                                        Name: "3 Months rolling",
                                        Description: "",
                                        Template: "Absolute12",
                                        ServiceFunction: "EXF12M3MR"
                                    },
                                    R1: {
                                        Name: "1 Month rolling",
                                        Description: "",
                                        Template: "Absolute12",
                                        ServiceFunction: "EXF12M1MR"
                                    }
                                }
                            },
                            InMarket: {
                                Name: "In-Market demand KLM",
                                Rolling: true,
                                Versions: {
                                    R6: {
                                        Name: "6 Months rolling",
                                        Description: "",
                                        Template: "Absolute18",
                                        ServiceFunction: "IMD18M6MR"
                                    },
                                    R3: {
                                        Name: "3 Months rolling",
                                        Description: "",
                                        Template: "Absolute12",
                                        ServiceFunction: "IMD12M3MR"
                                    },
                                    R1: {
                                        Name: "1 Month rolling",
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
                            //    Rolling: true,                             
                            //    Versions: {
                            //        R6: {
                            //            Name: "6 Months rolling",
                            //            Description: "6 month rolling",
                            //            Template: "Summary",
                            //            ServiceFunction: "Summary6MR"
                            //        },
                            //        R3: {
                            //            Name: "3 Months rolling",
                            //            Description: "3 months rolling",
                            //            Template: "Summary",
                            //            ServiceFunction: "Summary3MR"
                            //        },
                            //        R1: {
                            //            Name: "1 Month rolling",
                            //            Description: "1 months rolling",
                            //            Template: "Summary",
                            //            ServiceFunction: "Summary1MR"
                            //        }
                            //    }

                            //},
                            //Flow: {
                            //    Name: "Overview In-flow vs. Out-flow",
                            //    Flow: true,
                            //    Versions: {
                            //        Local: {
                            //            Name: "In-flow vs. Out-flow Local",
                            //            Type: "Local",
                            //            Description: "",
                            //            Template: "Flow",
                            //            ServiceFunction: "FlowCountry"
                            //        },
                            //        Global: {
                            //            Name: "Global In-flow vs. Out-flow Global",
                            //            Type: "Global",
                            //            Description: "",
                            //            Template: "Flow",
                            //            ServiceFunction: "FlowGlobal",
                            //            properties: ["brandUuid"]
                            //        }
                                   
                            //    }
                            //},
                            //Supply: {
                            //    Name: "Supply",
                            //    Supply: true,
                            //    Versions: {
                            //        Undersupply: {
                            //            Name: "Undersupply 3 months rolling",
                            //            Type: "Undersupply",
                            //            Description: "",
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
                                Rolling: true,
                                Versions: {
                                    R6: {
                                        Name: "6 Months rolling",
                                        Description: "6 month rolling",
                                        Template: "EmergencyChannel",
                                        ServiceFunction: "EC6MR"
                                    },
                                    R3: {
                                        Name: "3 Months rolling",
                                        Description: "3 month rolling",
                                        Template: "EmergencyChannel",
                                        ServiceFunction: "EC3MR"
                                    },
                                    R1: {
                                        Name: "1 Month rolling",
                                        Description: "1 month rolling",
                                        Template: "EmergencyChannel",
                                        ServiceFunction: "EC1MR"
                                    }
                                }
                            }
                        }
                    }
                };
                return reps;
            },
            report: function ($stateParams) {
                var rep = service.reports()[$stateParams.dashboard]
                    .Reports[$stateParams.report];
                var r;
                if (rep.Rolling) {
                    r = rep.Versions[$stateParams.Rolling];
                } else if (rep.Flow) {
                    r = rep.Versions[$stateParams.Flow];
                } else if (rep.Supply) {
                    r = rep.Versions[$stateParams.Supply];
                } else {
                   
                }
                if (r) {
                     return r; 
                }
                return {
                    Name: "1 Month rolling",
                    Template: "NoData",
                    ServiceFunction: "NoData"
                };
            },
            reportsOld: function () {
                return [
                    {
                        Name: "Summary - 6 Month rolling",
                        Description: "6 month rolling",
                        Template: "Summary",
                        ServiceFunction: "Summary6MR"
                    }, {
                        Name: "Summary - 3 Month rolling",
                        Description: "3 month rolling",
                        Template: "Summary",
                        ServiceFunction: "Summary3MR"
                    },
                    {
                        Name: "Overview In-flow vs. Out-flow",
                        Description: "",
                        Template: "Flow",
                        ServiceFunction: "FlowGlobal",
                        properties: ["brandUuid"]

                    },
                    {
                        Name: "Overview In-flow vs. Out-flow",
                        Description: "",
                        Template: "Flow",
                        ServiceFunction: "FlowCountry"
                    },
                    {
                        Name: "Undersupply 3 months rolling",
                        Description: "",
                        Template: "Supply",
                        ServiceFunction: "Undersupply"
                    }, {
                        Name: "Oversupply 3 months rolling",
                        Description: "",
                        Template: "Supply",
                        ServiceFunction: "Oversupply"
                    }, {
                        Name: "Emergency Channel - 6 Months rolling",
                        Description: "6 month rolling",
                        Template: "Summary",
                        ServiceFunction: "EC6MR"
                    }, {
                        Name: "Emergency Channel - 3 Months rolling",
                        Description: "3 month rolling",
                        Template: "Summary",
                        ServiceFunction: "EC3MR"
                    }, {
                        Name: "Emergency Channel - 1 Months rolling",
                        Description: "1 month rolling",
                        Template: "Summary",
                        ServiceFunction: "EC1MR"
                    }
                ];
            }
        };
        return service;
    }
})();