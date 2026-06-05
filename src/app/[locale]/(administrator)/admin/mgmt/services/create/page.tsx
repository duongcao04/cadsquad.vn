'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import {
    Button,
    Card,
    Chip,
    Dropdown,
    ListBox,
    Select,
    Separator,
    Spinner,
    Tabs,
    TextArea,
} from '@heroui/react'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Link as LinkIcon,
    Plus,
    Search,
    Settings2,
} from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'

import RichTextEditor from '@/components/RichTextEditor'

import {
    AdminPageBody,
    AdminPageContainer,
    AdminPageHeading,
} from '../../../../../../../components'
import MediaUploader from '../../../../../../../features/service-management/components/MediaUploader'
import {
    serviceOptions,
    serviceTypesListOptions,
    useCreateServiceMutation,
    useUpdateServiceMutation,
} from '../../../../../../../queires'
import {
    Language,
    TServiceTranslation,
    TServiceType,
    TServiceTypeTranslation,
} from '../../../../../../../types'

type Step = 'general' | 'content'

const SUPPORTED_LANGUAGES: { key: Language; label: string }[] = [
    { key: 'EN', label: 'English (EN)' },
    { key: 'VI', label: 'Tiếng Việt (VI)' },
]

interface Props {
    mode: 'create' | 'edit'
    id: string
}

export default function CreateServicePage({ mode, id }: Props) {
    const navigate = useNavigate()

    const [step, setStep] = useState<Step>('general')
    const [activeLang, setActiveLang] = useState<Language>('EN')
    const [activeLanguages, setActiveLanguages] = useState<Language[]>(['EN'])
    const [hasInitialized, setHasInitialized] = useState(false)

    const {
        data: { serviceTypes },
    } = useSuspenseQuery(serviceTypesListOptions)

    const { data, isLoading: isFetching } = useQuery({
        ...serviceOptions(id),
        enabled: mode === 'edit' && !!id,
    })

    const existingData = data?.service

    const { mutate: createService, isPending: isCreating } =
        useCreateServiceMutation()
    const { mutate: updateService, isPending: isUpdating } =
        useUpdateServiceMutation()
    const isPending = isCreating || isUpdating

    const [formData, setFormData] = useState({
        orderNumber: '',
        serviceTypeId: '',
        thumbnailUrl: '',
        backgroundCoverUrl: '',
        translations: {
            EN: {
                title: '',
                slug: '',
                description: '',
                shortDescription: '',
                content: '',
                seoTitle: '',
                seoDescription: '',
                seoKeywords: '',
            },
            VI: {
                title: '',
                slug: '',
                description: '',
                shortDescription: '',
                content: '',
                seoTitle: '',
                seoDescription: '',
                seoKeywords: '',
            },
        },
    })

    const serviceTypeSelectedKey = useMemo(
        () => formData.serviceTypeId || null,
        [formData.serviceTypeId]
    )

    useEffect(() => {
        if (mode === 'edit' && existingData && !hasInitialized) {
            const loadedLangs = existingData.translations.map(
                (t: TServiceTranslation) => t.language as Language
            )
            if (loadedLangs.length > 0) {
                setActiveLanguages(loadedLangs)
                setActiveLang(
                    loadedLangs.includes('EN') ? 'EN' : loadedLangs[0]
                )
            }

            const emptyTranslation = {
                title: '',
                slug: '',
                description: '',
                shortDescription: '',
                content: '',
                seoTitle: '',
                seoDescription: '',
                seoKeywords: '',
            }
            const mappedTranslations: typeof formData.translations = {
                EN: { ...emptyTranslation },
                VI: { ...emptyTranslation },
            }

            existingData.translations.forEach((t: TServiceTranslation) => {
                mappedTranslations[t.language as Language] = {
                    title: t.title || '',
                    slug: t.slug || '',
                    description: t.description || '',
                    shortDescription: t.shortDescription || '',
                    content: t.content || '',
                    seoTitle: t.seoTitle || '',
                    seoDescription: t.seoDescription || '',
                    seoKeywords: Array.isArray(t.seoKeywords)
                        ? t.seoKeywords.join(', ')
                        : t.seoKeywords || '',
                }
            })

            setFormData({
                orderNumber: existingData.orderNumber?.toString() || '',
                serviceTypeId: existingData.serviceTypeId?.toString() || '',
                thumbnailUrl: existingData.thumbnail?.url || '',
                backgroundCoverUrl: existingData.backgroundCover?.url || '',
                translations: mappedTranslations,
            })

            setHasInitialized(true)
        }
    }, [existingData, mode, hasInitialized])

    const handleTranslationChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            translations: {
                ...prev.translations,
                [activeLang]: {
                    ...prev.translations[activeLang],
                    [field]: value,
                },
            },
        }))
    }

    const handleAddLanguage = (langKey: Language) => {
        if (!activeLanguages.includes(langKey)) {
            setActiveLanguages((prev) => [...prev, langKey])
        }
        setActiveLang(langKey)
    }

    const handleStepChange = useCallback(
        (key: React.Key) => setStep(key as Step),
        []
    )

    const handleActiveLangChange = useCallback(
        (key: React.Key) => setActiveLang(key as Language),
        []
    )

    const unselectedLanguages = SUPPORTED_LANGUAGES.filter(
        (lang) => !activeLanguages.includes(lang.key)
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const payload = {
            ...(mode === 'edit' && { id }),
            orderNumber: parseInt(formData.orderNumber) || 0,
            serviceTypeId: formData.serviceTypeId || undefined,
            thumbnailUrl: formData.thumbnailUrl || undefined,
            backgroundCoverUrl: formData.backgroundCoverUrl || undefined,
            translations: activeLanguages.map((lang) => ({
                language: lang,
                ...formData.translations[lang],
                seoKeywords: formData.translations[lang].seoKeywords
                    ? formData.translations[lang].seoKeywords.split(',').map((k) => k.trim()).filter(Boolean)
                    : [],
            })),
        }

        const mutationArgs = {
            onSuccess: () => {
                navigate({ to: '/admin/mgmt/services' })
            },
        }

        if (mode === 'edit') {
            updateService({ ...payload, id: id! }, mutationArgs)
        } else {
            createService(payload, mutationArgs)
        }
    }

    if (isFetching) {
        return (
            <AdminPageContainer>
                <div className="flex flex-1 items-center justify-center min-h-[500px]">
                    <Spinner color="accent" size="lg" />
                </div>
            </AdminPageContainer>
        )
    }

    return (
        <AdminPageContainer>
            <AdminPageHeading
                title={
                    <div className="flex items-center gap-4">
                        <Link to="/admin/mgmt/services">
                            <Button isIconOnly variant="ghost">
                                <ArrowLeft size={20} className="text-slate-500" />
                            </Button>
                        </Link>
                        <p>
                            {mode === 'edit'
                                ? 'Edit Service'
                                : 'Create New Service'}
                        </p>
                    </div>
                }
            />
            <AdminPageBody>
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-6 flex-1"
                >
                    {/* HEADER & STEPPER */}
                    <Card className="border-none w-full shrink-0">
                        <Card.Content className="flex-row items-center justify-between px-6 py-4">
                            <Tabs
                                selectedKey={step}
                                onSelectionChange={handleStepChange}
                            >
                                <Tabs.List>
                                    <Tabs.Tab id="general">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'general' ? 'bg-secondary text-white' : 'bg-default-200'}`}>
                                                1
                                            </div>
                                            General Info
                                        </div>
                                    </Tabs.Tab>
                                    <Tabs.Tab id="content">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'content' ? 'bg-secondary text-white' : 'bg-default-200'}`}>
                                                2
                                            </div>
                                            Write Content
                                        </div>
                                    </Tabs.Tab>
                                </Tabs.List>
                            </Tabs>

                            <div className="flex items-center gap-1 bg-default-100 p-1 rounded-full">
                                <Tabs
                                    selectedKey={activeLang}
                                    onSelectionChange={handleActiveLangChange}
                                >
                                    <Tabs.List>
                                        {activeLanguages.map((langKey) => {
                                            const langConfig = SUPPORTED_LANGUAGES.find((l) => l.key === langKey)
                                            return (
                                                <Tabs.Tab key={langKey} id={langKey}>
                                                    {langConfig?.label ?? langKey}
                                                </Tabs.Tab>
                                            )
                                        })}
                                    </Tabs.List>
                                </Tabs>

                                {unselectedLanguages.length > 0 && (
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <Button isIconOnly size="sm" variant="ghost" className="ml-1">
                                                <Plus size={16} />
                                            </Button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Popover>
                                            <Dropdown.Menu
                                                aria-label="Add Translation"
                                                onAction={(key) => handleAddLanguage(key as Language)}
                                            >
                                                {unselectedLanguages.map((lang) => (
                                                    <Dropdown.Item key={lang.key} id={lang.key}>
                                                        {lang.label}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown.Popover>
                                    </Dropdown>
                                )}
                            </div>
                        </Card.Content>
                    </Card>

                    {/* STEP 1: GENERAL INFO */}
                    {step === 'general' && (
                        <div className="flex flex-col xl:flex-row gap-6 animate-in fade-in duration-300 w-full flex-1">
                            <Card className="flex-1 border-none">
                                <Card.Content className="p-8 space-y-6">
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Basic Information ({activeLang})
                                    </h2>

                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-sm font-medium text-foreground">Service Title <span className="text-danger">*</span></label>
                                            <input
                                                placeholder="e.g. Web Development"
                                                value={formData.translations[activeLang].title}
                                                onChange={(e) => handleTranslationChange('title', e.target.value)}
                                                className="w-full px-3 py-3 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary text-base"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-sm font-medium text-foreground">URL Slug <span className="text-danger">*</span></label>
                                            <input
                                                placeholder="e.g. web-development"
                                                value={formData.translations[activeLang].slug}
                                                onChange={(e) => handleTranslationChange('slug', e.target.value)}
                                                className="w-full px-3 py-3 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary text-base"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-sm font-medium text-foreground">Short Description <span className="text-danger">*</span></label>
                                            <TextArea
                                                placeholder="Used for cards and lists..."
                                                value={formData.translations[activeLang].shortDescription}
                                                onChange={(e) => handleTranslationChange('shortDescription', e.target.value)}
                                                className="w-full px-3 py-3 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary min-h-[80px] text-base"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-sm font-medium text-foreground">Full Description <span className="text-danger">*</span></label>
                                            <TextArea
                                                placeholder="Detailed description of the service..."
                                                value={formData.translations[activeLang].description}
                                                onChange={(e) => handleTranslationChange('description', e.target.value)}
                                                className="w-full px-3 py-3 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary min-h-[120px] text-base"
                                            />
                                        </div>
                                    </div>

                                    <Separator className="my-4" />

                                    <div className="flex justify-end">
                                        <Button
                                            variant="secondary"
                                            onPress={() => setStep('content')}
                                            className="font-medium shadow-md shadow-secondary/20 px-8"
                                            size="lg"
                                        >
                                            Continue to Content
                                            <ArrowRight size={16} />
                                        </Button>
                                    </div>
                                </Card.Content>
                            </Card>

                            {/* Right Sidebar: Settings & SEO */}
                            <Card className="xl:w-[450px] shrink-0 border-none h-fit">
                                <Tabs>
                                    <Tabs.List className="gap-6 w-full relative rounded-none p-0 border-b border-divider px-6">
                                        <Tabs.Tab id="settings" className="max-w-fit px-0 h-14">
                                            <div className="flex items-center gap-2">
                                                <Settings2 size={16} /> Global Settings
                                            </div>
                                        </Tabs.Tab>
                                        <Tabs.Tab id="seo" className="max-w-fit px-0 h-14">
                                            <div className="flex items-center gap-2">
                                                <Search size={16} /> Localized SEO
                                            </div>
                                        </Tabs.Tab>
                                    </Tabs.List>
                                    <Tabs.Panel id="settings" className="p-6 bg-default-50">
                                        <div className="space-y-8">
                                            <div className="space-y-5">
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-sm font-medium text-foreground">Order Number</label>
                                                    <input
                                                        type="number"
                                                        placeholder="e.g. 1"
                                                        value={formData.orderNumber}
                                                        onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                                                        className="w-full px-3 py-2 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary text-base"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-sm font-medium text-foreground">Service Type</label>
                                                    <Select
                                                        selectedKey={serviceTypeSelectedKey}
                                                        onSelectionChange={(key) =>
                                                            setFormData({ ...formData, serviceTypeId: key as string })
                                                        }
                                                    >
                                                        <Select.Trigger className="w-full bg-default-100 border border-default-200">
                                                            <Select.Value />
                                                            <Select.Indicator />
                                                        </Select.Trigger>
                                                        <Select.Popover>
                                                            <ListBox>
                                                                {serviceTypes.map((st: TServiceType) => (
                                                                    <ListBox.Item
                                                                        key={st.id}
                                                                        id={st.id.toString()}
                                                                    >
                                                                        {
                                                                            st.translations.find(
                                                                                (tl: TServiceTypeTranslation) => tl.language === 'EN'
                                                                            )?.displayName
                                                                        }
                                                                    </ListBox.Item>
                                                                ))}
                                                            </ListBox>
                                                        </Select.Popover>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div>
                                                <span className="block text-sm font-medium text-foreground pb-3">
                                                    Media Assets
                                                </span>
                                                <div className="flex flex-col gap-8">
                                                    <div className="flex flex-col gap-3">
                                                        <span className="text-sm font-medium text-default-600">
                                                            Service Thumbnail
                                                        </span>
                                                        <MediaUploader
                                                            label="Upload Thumbnail"
                                                            value={formData.thumbnailUrl}
                                                            onChange={(url) => setFormData({ ...formData, thumbnailUrl: url })}
                                                        />
                                                        <div className="relative flex items-center">
                                                            <LinkIcon size={16} className="absolute left-3 text-default-400" />
                                                            <input
                                                                placeholder="Or paste image URL here..."
                                                                value={formData.thumbnailUrl}
                                                                onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                                                                className="w-full pl-8 pr-3 py-2 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary text-base"
                                                            />
                                                        </div>
                                                    </div>

                                                    <Separator />

                                                    <div className="flex flex-col gap-3">
                                                        <span className="text-sm font-medium text-default-600">
                                                            Background Cover
                                                        </span>
                                                        <MediaUploader
                                                            label="Upload Background Cover"
                                                            value={formData.backgroundCoverUrl}
                                                            onChange={(url) => setFormData({ ...formData, backgroundCoverUrl: url })}
                                                        />
                                                        <div className="relative flex items-center">
                                                            <LinkIcon size={16} className="absolute left-3 text-default-400" />
                                                            <input
                                                                placeholder="Or paste image URL here..."
                                                                value={formData.backgroundCoverUrl}
                                                                onChange={(e) => setFormData({ ...formData, backgroundCoverUrl: e.target.value })}
                                                                className="w-full pl-8 pr-3 py-2 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary text-base"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tabs.Panel>
                                    <Tabs.Panel id="seo" className="p-6 bg-default-50">
                                        <div className="space-y-6">
                                            <div className="flex flex-col gap-1">
                                                <label className="text-sm font-medium text-foreground">SEO Title ({activeLang})</label>
                                                <input
                                                    placeholder="Optimal: 50-60 chars"
                                                    value={formData.translations[activeLang].seoTitle}
                                                    onChange={(e) => handleTranslationChange('seoTitle', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary text-base"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label className="text-sm font-medium text-foreground">SEO Description ({activeLang})</label>
                                                <TextArea
                                                    placeholder="Optimal: 150-160 chars"
                                                    value={formData.translations[activeLang].seoDescription}
                                                    onChange={(e) => handleTranslationChange('seoDescription', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary min-h-[100px] text-base"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label className="text-sm font-medium text-foreground">Keywords ({activeLang})</label>
                                                <input
                                                    placeholder="Comma separated..."
                                                    value={formData.translations[activeLang].seoKeywords}
                                                    onChange={(e) => handleTranslationChange('seoKeywords', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border border-default-200 bg-default-100 outline-none focus:border-secondary text-base"
                                                />
                                            </div>
                                        </div>
                                    </Tabs.Panel>
                                </Tabs>
                            </Card>
                        </div>
                    )}

                    {/* STEP 2: WRITE CONTENT */}
                    {step === 'content' && (
                        <div className="flex flex-col gap-6 animate-in fade-in duration-300 w-full flex-1 min-h-[750px]">
                            <Card className="border-l-4 border-l-secondary shrink-0">
                                <Card.Content className="flex-row items-center justify-between p-5">
                                    <div>
                                        <p className="text-xs font-semibold text-default-500 uppercase tracking-wider mb-1">
                                            Writing content for
                                        </p>
                                        <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                                            {formData.translations[activeLang].title || 'Untitled Service'}
                                            <Chip size="sm" variant="soft" color="default">
                                                /{formData.translations[activeLang].slug || 'no-slug'}
                                            </Chip>
                                        </h3>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        onPress={() => setStep('general')}
                                    >
                                        Edit General Info
                                    </Button>
                                </Card.Content>
                            </Card>

                            <Card className="flex-1 flex flex-col overflow-hidden border-none min-h-[600px]">
                                <div className="flex-1 overflow-hidden flex flex-col bg-white">
                                    <RichTextEditor
                                        value={formData.translations[activeLang].content}
                                        onChange={(htmlValue) =>
                                            handleTranslationChange('content', htmlValue)
                                        }
                                    />
                                </div>
                                <div className="border-t border-divider p-5 bg-default-50 flex items-center justify-between shrink-0">
                                    <div className="text-sm font-medium text-default-500 flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-success" />{' '}
                                        Auto-saved locally
                                    </div>
                                    <Button
                                        type="submit"
                                        variant="secondary"
                                        size="lg"
                                        className="font-medium shadow-md shadow-secondary/20 px-10"
                                        isDisabled={isPending}
                                    >
                                        {isPending ? (
                                            <><Spinner size="sm" color="current" /> Publishing...</>
                                        ) : mode === 'edit' ? (
                                            'Update Service'
                                        ) : (
                                            'Publish Service'
                                        )}
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    )}
                </form>
            </AdminPageBody>
        </AdminPageContainer>
    )
}
