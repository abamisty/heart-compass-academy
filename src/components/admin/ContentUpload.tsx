import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  FileText, 
  FileAudio, 
  FileImage, 
  FileVideo,
  Download,
  Check,
  X,
  AlertTriangle,
  RefreshCw,
  Database,
  Zap,
  FileSpreadsheet,
  Plus,
  Eye,
  Trash2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface UploadedFile {
  id: string;
  name: string;
  type: 'csv' | 'audio' | 'image' | 'video' | 'text';
  size: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  url?: string;
  metadata?: any;
  generatedExercises?: number;
}

interface BulkUploadJob {
  id: string;
  type: 'vocabulary' | 'audio' | 'images';
  totalFiles: number;
  processedFiles: number;
  status: 'running' | 'completed' | 'error';
  startTime: Date;
  estimatedCompletion?: Date;
  errors: string[];
}

const ContentUpload: React.FC = () => {
  const { toast } = useToast();
  
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'digital_citizenship_vocab.csv',
      type: 'csv',
      size: 15360,
      status: 'completed',
      progress: 100,
      metadata: { rows: 45, columns: 4 },
      generatedExercises: 12
    },
    {
      id: '2',
      name: 'pronunciation_audio.zip',
      type: 'audio',
      size: 2048000,
      status: 'completed',
      progress: 100,
      metadata: { files: 23, duration: '12:34' },
      generatedExercises: 23
    }
  ]);

  const [bulkJobs, setBulkJobs] = useState<BulkUploadJob[]>([
    {
      id: '1',
      type: 'vocabulary',
      totalFiles: 3,
      processedFiles: 3,
      status: 'completed',
      startTime: new Date(Date.now() - 300000),
      errors: []
    }
  ]);

  const [csvContent, setCsvContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      const uploadedFile: UploadedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: getFileType(file.name),
        size: file.size,
        status: 'uploading',
        progress: 0
      };

      setUploadedFiles(prev => [uploadedFile, ...prev]);

      // Simulate upload progress
      simulateUpload(uploadedFile.id);
    });
  }, []);

  const getFileType = (filename: string): UploadedFile['type'] => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'csv': return 'csv';
      case 'mp3': case 'wav': case 'ogg': return 'audio';
      case 'jpg': case 'jpeg': case 'png': case 'gif': return 'image';
      case 'mp4': case 'webm': case 'avi': return 'video';
      default: return 'text';
    }
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadedFiles(prev => prev.map(file => 
          file.id === fileId 
            ? { 
                ...file, 
                status: 'processing', 
                progress: 100 
              }
            : file
        ));
        
        // Simulate processing
        setTimeout(() => {
          setUploadedFiles(prev => prev.map(file => 
            file.id === fileId 
              ? { 
                  ...file, 
                  status: 'completed',
                  metadata: { processed: true },
                  generatedExercises: Math.floor(Math.random() * 20) + 5
                }
              : file
          ));
        }, 2000);
      } else {
        setUploadedFiles(prev => prev.map(file => 
          file.id === fileId ? { ...file, progress } : file
        ));
      }
    }, 200);
  };

  const handleCsvImport = () => {
    if (!csvContent.trim()) {
      toast({
        title: "No Content",
        description: "Please paste CSV content first.",
        variant: "destructive",
      });
      return;
    }

    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',');
    const rows = lines.slice(1);

    const uploadedFile: UploadedFile = {
      id: Date.now().toString(),
      name: 'imported_vocabulary.csv',
      type: 'csv',
      size: csvContent.length,
      status: 'processing',
      progress: 100,
      metadata: { rows: rows.length, columns: headers.length }
    };

    setUploadedFiles(prev => [uploadedFile, ...prev]);
    setCsvContent('');

    setTimeout(() => {
      setUploadedFiles(prev => prev.map(file => 
        file.id === uploadedFile.id 
          ? { 
              ...file, 
              status: 'completed',
              generatedExercises: Math.floor(rows.length * 0.3)
            }
          : file
      ));
      
      toast({
        title: "CSV Imported",
        description: `Successfully imported ${rows.length} vocabulary items.`,
      });
    }, 1500);
  };

  const handleGenerateExercises = (fileId: string) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      setUploadedFiles(prev => prev.map(file => 
        file.id === fileId 
          ? { 
              ...file, 
              generatedExercises: (file.generatedExercises || 0) + Math.floor(Math.random() * 10) + 5
            }
          : file
      ));
      
      setIsGenerating(false);
      toast({
        title: "Exercises Generated",
        description: "AI has created new exercises from your content.",
      });
    }, 2000);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'csv': return <FileSpreadsheet className="h-5 w-5" />;
      case 'audio': return <FileAudio className="h-5 w-5" />;
      case 'image': return <FileImage className="h-5 w-5" />;
      case 'video': return <FileVideo className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <Check className="h-4 w-4 text-green-600" />;
      case 'error': return <X className="h-4 w-4 text-red-600" />;
      case 'processing': return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      default: return <RefreshCw className="h-4 w-4 text-gray-400 animate-spin" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">File Upload</TabsTrigger>
          <TabsTrigger value="csv">CSV Import</TabsTrigger>
          <TabsTrigger value="ai">AI Generation</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Drag & Drop Upload Area */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Content Files</CardTitle>
              <CardDescription>
                Upload images, audio, video, or CSV files to create learning content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors"
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileUpload(e.dataTransfer.files);
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Drop files here or click to browse</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports CSV, images (JPG, PNG), audio (MP3, WAV), and video (MP4) files
                </p>
                <Input
                  type="file"
                  multiple
                  accept=".csv,.jpg,.jpeg,.png,.gif,.mp3,.wav,.ogg,.mp4,.webm,.avi"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </label>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="csv" className="space-y-6">
          {/* CSV Import */}
          <Card>
            <CardHeader>
              <CardTitle>Import Vocabulary from CSV</CardTitle>
              <CardDescription>
                Paste CSV content with vocabulary words, translations, and definitions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">CSV Format Example:</label>
                <div className="p-3 bg-muted rounded text-sm font-mono">
                  word,translation,definition,example<br/>
                  privacy,confidentialité,keeping information secret,Your privacy is important<br/>
                  security,sécurité,protection from threats,Use strong security measures
                </div>
              </div>
              <Textarea
                placeholder="Paste your CSV content here..."
                value={csvContent}
                onChange={(e) => setCsvContent(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
              <Button onClick={handleCsvImport} disabled={!csvContent.trim()}>
                <Database className="h-4 w-4 mr-2" />
                Import CSV Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          {/* AI Generation */}
          <Card>
            <CardHeader>
              <CardTitle>AI Content Generation</CardTitle>
              <CardDescription>
                Use AI to automatically generate exercises from your uploaded content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {uploadedFiles.filter(f => f.status === 'completed').map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div>
                        <h4 className="font-medium">{file.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {file.generatedExercises || 0} exercises generated
                        </p>
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleGenerateExercises(file.id)}
                      disabled={isGenerating}
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Generate More
                    </Button>
                  </div>
                ))}
              </div>
              
              {uploadedFiles.filter(f => f.status === 'completed').length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Zap className="h-12 w-12 mx-auto mb-4" />
                  <p>Upload and process files first to enable AI generation</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6">
          {/* Bulk Operations */}
          <Card>
            <CardHeader>
              <CardTitle>Bulk Upload Jobs</CardTitle>
              <CardDescription>
                Monitor large-scale content import operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bulkJobs.map((job) => (
                  <div key={job.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium capitalize">{job.type} Import</h4>
                      <Badge variant={job.status === 'completed' ? 'default' : job.status === 'error' ? 'destructive' : 'secondary'}>
                        {job.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress:</span>
                        <span>{job.processedFiles}/{job.totalFiles} files</span>
                      </div>
                      <Progress value={(job.processedFiles / job.totalFiles) * 100} />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Started: {job.startTime.toLocaleTimeString()}</span>
                        {job.estimatedCompletion && (
                          <span>ETA: {job.estimatedCompletion.toLocaleTimeString()}</span>
                        )}
                      </div>
                      {job.errors.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-destructive">
                          <AlertTriangle className="h-4 w-4" />
                          {job.errors.length} errors occurred
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Uploaded Files List */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Files ({uploadedFiles.length})</CardTitle>
          <CardDescription>
            Manage your uploaded content and generated exercises
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getFileIcon(file.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{file.name}</h4>
                      {getStatusIcon(file.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>
                      {file.metadata && file.type === 'csv' && (
                        <span>{file.metadata.rows} rows</span>
                      )}
                      {file.generatedExercises && (
                        <span className="text-green-600">{file.generatedExercises} exercises</span>
                      )}
                    </div>
                    {file.status === 'uploading' && (
                      <Progress value={file.progress} className="mt-2" />
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {file.status === 'completed' && (
                    <>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentUpload;