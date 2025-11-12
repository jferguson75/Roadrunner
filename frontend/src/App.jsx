import React, { useState, useMemo } from 'react';
import {
    createTheme,
    ThemeProvider,
    CssBaseline,
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    AppBar,
    Toolbar,
    Switch,
    FormControlLabel,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField, // Added for the date input
} from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip as RechartsTooltip,
} from 'recharts';
import {
    Security,
    DevicesOther,
    Group,
    Business,
    Lock,
    Scanner,
    AdminPanelSettings,
    Backup,
    FlightTakeoff,
    CheckCircle,
    ArrowForward,
    SupportAgent,
    EscalatorWarning,
} from '@mui/icons-material';

// --- Theme Definitions ---

const azngaPalette = {
    primary: {
        main: '#ED1C24', // AZNGA Primary
    },
    secondary: {
        main: '#424242', // A dark grey for contrast
    },
    background: {
        default: '#f5f5f5',
        paper: '#ffffff',
    },
    text: {
        primary: '#212121',
        secondary: '#555',
    },
};

const vbpPalette = {
    primary: {
        main: '#174A40', // VBP Primary
    },
    secondary: {
        main: '#68D78B', // VBP Secondary
    },
    background: {
        default: '#f8f9fa',
        paper: '#ffffff',
    },
    text: {
        primary: '#212121',
        secondary: '#444',
    },
};

const createAznTheme = () => createTheme({
    palette: azngaPalette,
    typography: {
        // Updated font stack with web-safe fallbacks
        fontFamily: '"Century Gothic", "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        h1: { fontSize: '2.5rem', fontWeight: 700 },
        h2: { fontSize: '2rem', fontWeight: 700, color: azngaPalette.primary.main, marginBottom: '1rem' },
        h3: { fontSize: '1.5rem', fontWeight: 600, color: azngaPalette.secondary.main, marginBottom: '0.5rem' },
        body1: { fontSize: '1rem' },
    },
});

const createVbpTheme = () => createTheme({
    palette: vbpPalette,
    typography: {
        // Updated font stack with web-safe fallbacks
        fontFamily: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        h1: { fontSize: '2.5rem', fontWeight: 700 },
        h2: { fontSize: '2rem', fontWeight: 700, color: vbpPalette.primary.main, marginBottom: '1rem' },
        h3: { fontSize: '1.5rem', fontWeight: 600, color: vbpPalette.primary.main, marginBottom: '0.5rem' },
        body1: { fontSize: '1rem' },
    },
});

// --- Data Definitions ---

const headerStats = [
    { label: 'Businesses Migrating', value: '4', icon: <Business fontSize="large" /> },
    { label: 'Week Total Timeline', value: '21', icon: <DevicesOther fontSize="large" /> },
    { label: 'Security Goal', value: 'E8 L2', icon: <Security fontSize="large" /> },
];

const securityStack = [
    { name: 'Threatlocker', desc: 'Application whitelisting & control.', icon: <Lock /> },
    { name: 'CyberCNS', desc: 'Vulnerability management & compliance.', icon: <Scanner /> },
    { name: 'Acronis (EDR)', desc: 'Endpoint detection & response.', icon: <AdminPanelSettings /> },
    { name: 'SpinOne', desc: 'Cyber posture & M365 backups.', icon: <Backup /> },
];

const ganttData = [
    { name: 'P1: Initiation & Planning', start: 1, duration: 2, end: 3 },
    { name: 'P2: Design & Architecture', start: 3, duration: 3, end: 6 },
    { name: 'P3: Tenant Build & Security', start: 7, duration: 3, end: 10 },
    { name: 'P4: Pilot Migration', start: 11, duration: 1, end: 12 },
    { name: 'P5: Phased Production Migration', start: 13, duration: 5, end: 18 },
    { name: 'P6: Service Transition', start: 13, duration: 6, end: 19 },
    { name: 'P7: Project Closure', start: 20, duration: 1, end: 21 },
];

const effortData = [
    { name: 'P1: Initiation & Planning', value: 3 },
    { name: 'P2: Design & Architecture', value: 3 },
    { name: 'P3: Tenant Build & Security', value: 3 },
    { name: 'P4: Pilot Migration', value: 1 },
    { name: 'P5: Production Migration', value: 5 },
    { name: 'P6: Service Transition', value: 6 },
    { name: 'P7: Project Closure', value: 1 },
];

const migrationWaves = [
    { wave: 'Wave 1: Nestworth', week: 'Wk 13-14', icon: <FlightTakeoff /> },
    { wave: 'Wave 2: Ottavo', week: 'Wk 14-15', icon: <FlightTakeoff /> },
    { wave: 'Wave 3: On Track', week: 'Wk 16-17', icon: <FlightTakeoff /> },
    { wave: 'Wave 4: Wealthwise', week: 'Wk 17-18', icon: <CheckCircle /> },
];

// --- Reusable Components ---

const StatCard = ({ item }) => (
    <Grid item xs={12} sm={4}>
        <Paper elevation={3} sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <Box sx={{ color: 'primary.main' }}>
                {item.icon}
            </Box>
            <Box>
                <Typography variant="h4" component="div" fontWeight="bold">{item.value}</Typography>
                <Typography variant="body2" color="text.secondary" textTransform="uppercase">{item.label}</Typography>
            </Box>
        </Paper>
    </Grid>
);

const InfoCard = ({ title, children }) => (
    <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h2">{title}</Typography>
                {children}
            </CardContent>
        </Card>
    </Grid>
);

const ChartCard = ({ title, description, children }) => (
    <Card elevation={3}>
        <CardContent>
            <Typography variant="h2">{title}</Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                {description}
            </Typography>
            <Box sx={{ height: 400 }}>
                {children}
            </Box>
        </CardContent>
    </Card>
);

// --- Chart Components ---

// Helper function to format dates
const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
};

// Helper function to add weeks to a date
const addWeeks = (dateString, weekCount) => {
    try {
        const baseDate = new Date(dateString);
        baseDate.setDate(baseDate.getDate() + weekCount * 7);
        return baseDate;
    } catch (e) {
        return new Date();
    }
};

const CustomGanttTooltip = ({ active, payload, startDate }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <Paper sx={{ p: 1.5, background: 'rgba(255, 255, 255, 0.9)' }}>
                <Typography variant="body2" fontWeight="bold">{data.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Start: {formatDate(addWeeks(startDate, data.start))}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    End: {formatDate(addWeeks(startDate, data.end))}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Duration: {data.duration} {data.duration > 1 ? 'weeks' : 'week'}
                </Typography>
            </Paper>
        );
    }
    return null;
};

const ProjectGanttChart = ({ theme, startDate }) => {
    // This function will be called by the X-axis to format its labels
    const ganttTickFormatter = (weekNumber) => {
        if (!startDate) return `Wk ${weekNumber}`;
        return formatDate(addWeeks(startDate, weekNumber));
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                layout="vertical"
                data={ganttData}
                margin={{ top: 20, right: 30, left: 150, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    type="number"
                    domain={[0, 22]}
                    ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]}
                    tickFormatter={ganttTickFormatter} // Use the dynamic formatter
                />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip content={<CustomGanttTooltip startDate={startDate} />} />
                <Bar dataKey="start" stackId="a" fill="transparent" />
                <Bar dataKey="duration" stackId="a" fill={theme.palette.primary.main} />
            </BarChart>
        </ResponsiveContainer>
    );
};


const CustomDonutTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <Paper sx={{ p: 1.5, background: 'rgba(255, 255, 255, 0.9)' }}>
                <Typography variant="body2" fontWeight="bold">{data.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.value} {data.value > 1 ? 'weeks' : 'week'}
                </Typography>
            </Paper>
        );
    }
    return null;
};

const EffortDonutChart = ({ theme }) => {
    const colors = [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.primary.light || theme.palette.secondary.main,
        theme.palette.secondary.light || theme.palette.primary.main,
        '#E0E0E0',
        '#BDBDBD',
        '#9E9E9E'
    ];
    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={effortData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={150}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                >
                    {effortData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <RechartsTooltip content={<CustomDonutTooltip />} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

// --- Content Components ---

// Re-written MigrationTimeline component without @mui/lab
const MigrationTimeline = ({ theme }) => (
    <List sx={{ pt: 2 }}>
        {migrationWaves.map((item, index) => (
            <ListItem key={index}>
                <ListItemIcon sx={{ minWidth: 56 }}>
                    <Box 
                        sx={{ 
                            width: 40, 
                            height: 40, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main', 
                            color: 'primary.contrastText', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}
                    >
                        {item.icon}
                    </Box>
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant="h6" component="h1">
                            {item.wave}
                        </Typography>
                    }
                    secondary={
                        <Typography
                            variant="body2"
                            component="span"
                            sx={{
                                background: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                display: 'inline-block',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                mt: 1
                            }}
                        >
                            {item.week}
                        </Typography>
                    }
                />
            </ListItem>
        ))}
    </List>
);

const ServiceModelFlow = () => (
    <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="space-around"
        sx={{
            p: 3,
            bgcolor: 'background.default',
            borderRadius: 2,
            mt: 2
        }}
    >
        <Box textAlign="center" p={2}>
            <Group sx={{ fontSize: 60, color: 'text.secondary' }} />
            <Typography variant="h6">User Support Request</Typography>
            <Typography variant="body2">(All 4 Businesses)</Typography>
        </Box>
        <ArrowForward sx={{ fontSize: 40, color: 'primary.main', transform: { xs: 'rotate(90deg)', md: 'rotate(0deg)' }, m: 2 }} />
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderTop: '4px solid', borderColor: 'secondary.main' }}>
            <SupportAgent sx={{ fontSize: 60, color: 'secondary.main' }} />
            <Typography variant="h5" fontWeight="bold">VBP</Typography>
            <Typography variant="h6">Level 1 & Level 2</Typography>
            <Typography variant="body2">Initial Triage, Standard Fixes</Typography>
        </Paper>
        <ArrowForward sx={{ fontSize: 40, color: 'primary.main', transform: { xs: 'rotate(90deg)', md: 'rotate(0deg)' }, m: 2 }} />
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center', borderTop: '4px solid', borderColor: 'primary.main' }}>
            <EscalatorWarning sx={{ fontSize: 60, color: 'primary.main' }} />
            <Typography variant="h5" fontWeight="bold">Fuse</Typography>
            <Typography variant="h6">Level 3 & Cyber</Typography>
            <Typography variant="body2">Escalations, Security Incidents</Typography>
        </Paper>
    </Box>
);

// --- Main App Component ---

export default function App() {
    const [themeName, setThemeName] = useState('VBP');
    
    // Get today's date in YYYY-MM-DD format for the input default
    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(today);
    
    const theme = useMemo(() => {
        return themeName === 'VBP' ? createVbpTheme() : createAznTheme();
    }, [themeName]);

    const handleThemeChange = (event) => {
        setThemeName(event.target.checked ? 'AZNGA' : 'VBP');
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, whiteSpace: 'nowrap' }}>
                        M365 Tenant Consolidation
                    </Typography>
                    
                    {/* START DATE INPUT FIELD */}
                    <TextField
                        type="date"
                        label="Project Start Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                        sx={{ 
                            marginRight: 2,
                            // Style for visibility on both light/dark app bars
                            bgcolor: 'rgba(255,255,255,0.15)',
                            borderRadius: 1,
                            '& .MuiInputBase-input': { color: 'white' },
                            '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                            '& .MInBBN-root': { color: 'white' }, // Calendar icon
                        }}
                    />
                    
                    {/* THEME SWITCHER */}
                    <FormControlLabel
                        control={
                            <Switch
                                checked={themeName === 'AZNGA'}
                                onChange={handleThemeChange}
                                color="default"
                            />
                        }
                        label={themeName === 'AZNGA' ? 'AZNGA' : 'VBP'}
                        sx={{ whiteSpace: 'nowrap' }}
                    />
                </Toolbar>
            </AppBar>
            
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box textAlign="center" mb={4}>
                    <Typography variant="h1" component="h1">
                        Project: `youradviceforlife` M365 Tenant Consolidation
                    </Typography>
                    <Typography variant="h5" color="text.secondary" mt={1}>
                        A visual overview of the migration, security uplift, and service transition plan.
                    </Typography>
                </Box>

                <Grid container spacing={3} mb={4}>
                    {headerStats.map((item) => (
                        <StatCard key={item.label} item={item} />
                    ))}
                </Grid>

                <Grid container spacing={3}>
                    <InfoCard title="Project Overview & Scope">
                        <Typography variant="body1" paragraph>
                            This project consolidates four distinct businesses from their existing Microsoft 365 environments into a single, new, secure tenant: `youradviceforlife`. This strategic move unifies operations and significantly enhances the collective security posture.
                        </Typography>
                        <Typography variant="h3">Consolidating Firms:</Typography>
                        <List dense>
                            {['Nestworth', 'Ottavo', 'On Track', 'Wealthwise'].map(firm => (
                                <ListItem key={firm}>
                                    <ListItemIcon sx={{minWidth: 40}}><Business color="secondary" /></ListItemIcon>
                                    <ListItemText primary={firm} />
                                 </ListItem>
                            ))}
                        </List>
                    </InfoCard>

                    <InfoCard title="New Security Posture (E8 L2)">
                        <Typography variant="body1" paragraph>
                            A primary objective is to build the new tenant to align with Essential 8 (E8) Level 2 compliance. This is achieved by implementing a modern, multi-layered security stack.
                        </Typography>
                        <Typography variant="h3">Key Security Stack:</Typography>
                        <List dense>
                            {securityStack.map(item => (
                                <ListItem key={item.name}>
                                    <ListItemIcon sx={{minWidth: 40}}>{React.cloneElement(item.icon, {color: "secondary"})}</ListItemIcon>
                                    <ListItemText primary={item.name} secondary={item.desc} />
                                </ListItem>
                            ))}
                        </List>
                    </InfoCard>

                    <Grid item xs={12}>
                        <ChartCard
                            title="Project Timeline by Phase (PMBOK v7)"
                            description="The entire 21-week project is broken down into seven distinct phases. The timeline visualizes the duration and sequencing of each major project stage."
                        >
                            {/* Pass startDate state down to the chart component */}
                            <ProjectGanttChart theme={theme} startDate={startDate} />
                        </ChartCard>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <ChartCard
                            title="Phase Effort Distribution"
                            description="This chart shows the proportion of the total project timeline (21 weeks) dedicated to each of the seven phases."
                        >
                            <EffortDonutChart theme={theme} />
                        </ChartCard>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <ChartCard
                            title="Phased Migration Plan (Phase 5)"
                            description="To minimize business disruption, the production migration is a carefully orchestrated series of migration waves."
                        >
                            <MigrationTimeline theme={theme} />
                        </ChartCard>
                    </Grid>

                    <Grid item xs={12}>
                        <ChartCard
                            title="New Co-Managed Service Model (Phase 6)"
                            description="This model defines clear responsibilities for day-to-day support and escalations, ensuring users get the right help quickly."
                        >
                            <ServiceModelFlow />
                        </ChartCard>
                    </Grid>
                </Grid>

                <Box component="footer" mt={6} py={3} textAlign="center">
                    <Typography variant="body2" color="text.secondary">
                        This infographic visualizes the M365 Tenant Consolidation project plan.
                    </Typography>
                </Box>
            </Container>
        </ThemeProvider>
    );
}