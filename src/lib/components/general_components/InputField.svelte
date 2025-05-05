<script lang="ts">
    export let label: string;
    export let type: string = 'text';
    export let placeholder: string = '';
    export let icon: string;
    export let required: boolean = false;
    export let value: string = '';
    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let min: string = '';
    export let error: string | undefined = undefined;
</script>

<div class="w-full">
    <label for="input-field" class="block text-sm font-medium text-gray-700 mb-1"></label>
<span id="input-label">{label} {#if required}<span class="text-red-500">*</span>{/if}</span>
    <!-- </label> -->
    <div class="relative">
        <span class="material-icons-sharp absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        <input 
            {type}
            {placeholder}
            bind:value
            required={required}
            disabled={disabled}
            readonly={readonly}
            min={min}
            class="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200"
        />
    </div>
</div>