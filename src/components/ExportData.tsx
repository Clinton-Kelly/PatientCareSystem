import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, FileText, Table } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePatients } from "@/hooks/usePatients";
import { useProcedures } from "@/hooks/useProcedures";

// Simplified export component - will be enhanced when backend provides export endpoints
export default function ExportData() {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [exportType, setExportType] = useState("");
  const { toast } = useToast();
  const { patients } = usePatients();
  const { procedures } = useProcedures();

  const handleExport = async () => {
    if (!exportType) {
      toast({
        title: "Error",
        description: "Please select an export format",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPatient) {
      toast({
        title: "Error",
        description: "Please select a patient",
        variant: "destructive",
      });
      return;
    }

    try {
      // TODO: Call backend export API endpoint
      toast({
        title: "Export Pending",
        description: "Backend export functionality will be implemented when Spring Boot API is connected",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5 text-primary" />
          Export Patient Data
        </CardTitle>
        <CardDescription>
          Export patient records, vital signs, appointments, and analyses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="patient-select">Select Patient</Label>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger>
                <SelectValue placeholder="Choose patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.first_name} {patient.last_name} - {patient.patient_id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="export-type">Export Format</Label>
            <Select value={exportType} onValueChange={setExportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    PDF Report
                  </div>
                </SelectItem>
                <SelectItem value="csv">
                  <div className="flex items-center gap-2">
                    <Table className="w-4 h-4" />
                    CSV Data
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Export Contents</Label>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>• Patient demographics and contact information</div>
            <div>• Medical history, allergies, and current medications</div>
            <div>• Complete vital signs history with timestamps</div>
            <div>• Appointment history and scheduling details</div>
            <div>• Doctor analyses, diagnoses, and recommendations</div>
            <div>• Prescription records and medication details</div>
          </div>
        </div>

        <Button 
          onClick={handleExport}
          className="w-full bg-gradient-medical text-white"
          disabled={!selectedPatient || !exportType}
        >
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>

        <div className="text-xs text-muted-foreground border border-border rounded-lg p-3 bg-muted/50">
          <p className="font-semibold mb-1">Note:</p>
          <p>Export functionality will be fully enabled when connected to Spring Boot backend API.</p>
        </div>
      </CardContent>
    </Card>
  );
}
